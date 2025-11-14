import path from "path";
import inquirer from "inquirer";
import type { TemplateType } from "../types/init.js";
import { copyDir, ensureDir, isDirEmpty } from "./fs.js";
import { logger } from "./logger.js";
import { colour } from "@prestonarnold/log";

export const TEMPLATE_PATHS: Record<TemplateType, string> = {
  web: path.resolve(__dirname, '../../templates/web'),
  api: path.resolve(__dirname, '../../templates/api'),
  full: path.resolve(__dirname, '../../templates/full'),
};

async function copyTemplate(template: TemplateType, targetPath: string): Promise<void> {
  const templatePath = TEMPLATE_PATHS[template];

  await ensureDir(targetPath);

  if (!(await isDirEmpty(targetPath))) {
    const { overwrite } = await inquirer.prompt({
      type: "confirm",
      name: "overwrite",
      message: `Target directory ${targetPath} is not empty. Overwrite?`,
      default: false,
    });

    if (!overwrite) {
      logger.error(colour.red("Aborting scaffolding."));
      return;
    }

    logger.info(colour.yellow(`Overwriting contents of ${targetPath}...`));
  }

  await copyDir(templatePath, targetPath);
}

export async function scaffoldProject(options: {
  template: TemplateType;
  targetPath: string;
}) {
  const { template, targetPath } = options;

  logger.info(`Scaffolding "${template}" template to ${targetPath}`);
  await copyTemplate(template, targetPath);

  logger.info(colour.green(`Project scaffolded successfully at ${targetPath}`));
}