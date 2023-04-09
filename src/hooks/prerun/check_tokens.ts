import { Hook } from "@oclif/core";
import { readFile, writeFile } from "fs/promises";
import * as dotenv from "dotenv";
import * as path from "path";
import { Config, RefreshResponse } from "../../types";

dotenv.config({
  path: __dirname + "/./../../../.env",
});

const hook: Hook<"prerun"> = async function (opts) {
  // don't run any of this token validation code during the auth command
  console.log(opts.Command.id);
  if (opts.Command.id === "auth") {
    console.log("we authin");
    return;
  }

  // resolve the location of the config file
  const config_dir_raw = "~/.config/tasks.config.json";
  const config_dir = path.resolve(
    config_dir_raw.replace(
      /^~/,
      process.env.HOME || process.env.USERPROFILE || ""
    )
  );

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

  // given that we throw and kill the process if there's an issue parsing the config file,
  // we can safely cast it to a Config here
  const configs: Config = (await readConfigs()) as Config;

  const { expire_stamp, refresh_token } = configs;

  // run the token refresh only if the access token is expired
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

    // generate new config and write to file and proceed with the command
    const out: Config = {
      access_token: data.access_token,
      expire_stamp: data.expires_in * 1000 + Date.now(),
      refresh_token: refresh_token,
    };

    await writeFile(config_dir, JSON.stringify(out, null, 2));

    return;
  } else {
    // if the access token is alright, proceed with the code
    console.log("proceed");
  }
};

export default hook;
