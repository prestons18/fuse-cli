import { Command } from "commander";
import inquirer from "inquirer";
import { logger } from "../utils/logger.js";
import { colour } from "@prestonarnold/log";
import { type TemplateType, VALID_TEMPLATES } from "../types/init.js";
import { validateInput } from "../utils/validateInput.js";

export interface InitAnswers {
    name: string;
    template: TemplateType;
}

export const initCommand = new Command("init")
    .description("Initialize a new Fuse project")
    .action(async () => {
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

        logger.info(colour.green(`Project "${answers.name}" initialized with template "${answers.template}"`));
    });