import { Hook } from "@oclif/core";
import { readFile, writeFile } from "fs/promises";
import * as dotenv from "dotenv";
import * as path from "path";
import { Config, RefreshResponse } from "../../types";

dotenv.config({
  path: __dirname + "/./../../../.env",
});

const hook: Hook<"prerun"> = async function (opts) {
  // don't run any of this token validation code during auth
  console.log(opts.Command.id);
  if (opts.Command.id === "auth") {
    console.log("we authin");
    return;
  }

  const config_dir_raw = "~/.config/tasks.config.json";
  const config_dir = path.resolve(
    config_dir_raw.replace(
      /^~/,
      process.env.HOME || process.env.USERPROFILE || ""
    )
  );

  console.log(config_dir);

  const readConfigs = async (): Promise<Config | undefined> => {
    try {
      const data: string = (await readFile(config_dir)).toString("utf8");
      const parsed = JSON.parse(data);
      return parsed;
    } catch (error) {
      console.log("file read error, please run $./tasks-cli auth");
      this.exit();
    }
  };

  const configs: Config = (await readConfigs()) as Config;

  const { expire_stamp, refresh_token } = configs;

  console.log(expire_stamp);

  if (expire_stamp < Date.now()) {
    console.log("get new tokens");
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GOOGLE_OAUTH_ID,
        client_secret: process.env.GOOGLE_OAUTH_SECRET,
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      }),
    });

    const data: RefreshResponse = await res.json();
    console.log(data);

    const out: Config = {
      access_token: data.access_token,
      expire_stamp: data.expires_in * 1000 + Date.now(),
      refresh_token: refresh_token,
    };

    await writeFile(config_dir, JSON.stringify(out, null, 2));

    return;
  } else {
    console.log("proceed");
  }

  process.stdout.write(
    `example hook running ${JSON.stringify(opts.Command.id)}\n`
  );
};

export default hook;
