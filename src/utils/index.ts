import * as path from "path";
import { Hook } from "@oclif/core";
import { readFile } from "fs/promises";
import { Config } from "../types";

const getConfigDir = (): string => {
  const config_dir_raw = "~/.config/tasks.config.json";
  const config_dir = path.resolve(
    config_dir_raw.replace(
      /^~/,
      process.env.HOME || process.env.USERPROFILE || ""
    )
  );

  return config_dir;
};

const readConfigs = async (c: Hook.Context): Promise<Config | undefined> => {
  try {
    const data: string = (await readFile(getConfigDir())).toString("utf8");
    const parsed = JSON.parse(data);
    return parsed;
  } catch (error) {
    console.log("file read error, please run $./tasks-cli auth");
    c.exit();
  }
};

export { getConfigDir, readConfigs };
