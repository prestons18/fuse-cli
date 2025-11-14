import path from "path";
import { Command } from "commander";
import inquirer from "inquirer";
import { logger } from "../utils/logger.js";
import { colour } from "@prestonarnold/log";
import { type TemplateType, VALID_TEMPLATES } from "../types/init.js";
import { validateInput } from "../utils/validateInput.js";
import { scaffoldProject } from "../utils/scaffold.js";

export interface InitAnswers {
    name: string;
    template: TemplateType;
}

export const initCommand = new Command("init")
    .argument("[targetPath]", "Target directory for the new project")
    .description("Initialize a new Fuse project")
    .action(async (targetPathArg: string | undefined) => {
        logger.info(colour.cyan("Welcome to Fuse CLI!"));

        const answers: InitAnswers = await inquirer.prompt([
            { type: "input", name: "name", message: "Project name:" },
            {
                type: "list",
                name: "template",
                message: "Choose a template:",
                choices: VALID_TEMPLATES,
            },
        ]);

        validateInput(answers);

        const targetPath = targetPathArg
            ? path.resolve(process.cwd(), targetPathArg)
            : path.resolve(process.cwd(), answers.name);

        const success = await scaffoldProject({
            template: answers.template,
            targetPath,
        });

        if (success) {
            logger.info(
                colour.green(
                    `Project "${answers.name}" initialized at "${targetPath}" with template "${answers.template}"`
                )
            );
        }
    });