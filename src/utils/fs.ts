import fs from "fs/promises";
import fsExtra from "fs-extra";

export async function ensureDir(path: string) {
  await fsExtra.ensureDir(path);
}

export async function copyDir(src: string, dest: string, overwrite = true) {
  await fsExtra.copy(src, dest, { overwrite, errorOnExist: false });
}

export async function isDirEmpty(dir: string) {
  try {
    const files = await fs.readdir(dir);
    return files.length === 0;
  } catch (err: any) {
    if (err.code === "ENOENT") return true;
    throw err;
  }
}