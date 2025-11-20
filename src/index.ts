import { Command } from "commander";
import { logger } from "./utils/logger.js";
import { initCommand } from "./commands/init.js";

const program = new Command();

program
  .name("fuse")
  .description("Fuse CLI")
  .version("0.1.0");

program.addCommand(initCommand);

program.parseAsync(process.argv).catch((err) => {
  logger.error(err.message);
  process.exit(1);
});