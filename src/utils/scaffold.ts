import path from "path";
import { fileURLToPath } from "url";
import inquirer from "inquirer";
import type { TemplateType } from "../types/init.js";
import { copyDir, ensureDir, isDirEmpty } from "./fs.js";
import { logger } from "./logger.js";
import { colour } from "@prestonarnold/log";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const TEMPLATE_PATHS: Record<TemplateType, string> = {
  web: path.resolve(__dirname, "../../templates/web"),
  api: path.resolve(__dirname, "../../templates/api"),
  full: path.resolve(__dirname, "../../templates/full"),
};

interface ScaffoldOptions {
  template: TemplateType;
  targetPath: string;
  force?: boolean;
}

interface ScaffoldResult {
  success: boolean;
  message?: string;
}

async function confirmOverwrite(targetPath: string, force: boolean): Promise<boolean> {
  if (force) return true;

  const { overwrite } = await inquirer.prompt<{ overwrite: boolean }>({
    type: "confirm",
    name: "overwrite",
    message: `Target directory ${targetPath} is not empty. Overwrite?`,
    default: false,
  });

  return overwrite;
}

async function copyTemplate(
  template: TemplateType,
  targetPath: string,
  force = false
): Promise<ScaffoldResult> {
  try {
    const templatePath = TEMPLATE_PATHS[template];

    await ensureDir(targetPath);

    const isEmpty = await isDirEmpty(targetPath);

    if (!isEmpty) {
      const shouldOverwrite = await confirmOverwrite(targetPath, force);

      if (!shouldOverwrite) {
        logger.error(colour.red("Scaffolding aborted by user."));
        return {
          success: false,
          message: "User cancelled overwrite",
        };
      }

      logger.info(colour.yellow(`Overwriting contents of ${targetPath}...`));
    }

    await copyDir(templatePath, targetPath);

    return {
      success: true,
      message: `Successfully scaffolded "${template}" template`,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logger.error(colour.red(`Failed to copy template: ${errorMessage}`));

    return {
      success: false,
      message: errorMessage,
    };
  }
}

export async function scaffoldProject(
  options: ScaffoldOptions
): Promise<boolean> {
  const { template, targetPath, force = false } = options;

  logger.info(colour.cyan(`Scaffolding "${template}" template to ${targetPath}...`));

  const result = await copyTemplate(template, targetPath, force);

  if (!result.success) {
    logger.error(colour.red(`Scaffolding failed: ${result.message}`));
  }

  return result.success;
}