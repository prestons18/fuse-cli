import { Command } from "commander";
import { logger } from "./utils/logger.js";

const program = new Command();

program
  .name("fuse")
  .description("Fuse CLI")
  .version("0.1.0");

program.parseAsync(process.argv).catch((err) => {
  logger.error(err.message);
  process.exit(1);
});
