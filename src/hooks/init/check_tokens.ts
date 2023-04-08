import { Hook } from "@oclif/core";
import { readFile } from "fs/promises";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({
  path: __dirname + "/./../../../.env",
});

const hook: Hook<"init"> = async function (opts) {
  if (opts.id === "auth") {
    console.log("we authin");
    return;
  }

  const readConfigs = async (): Promise<string | undefined> => {
    try {
      const config_dir_raw = "~/.config/tasks.config.json";
      const config_dir = path.resolve(
        config_dir_raw.replace(
          /^~/,
          process.env.HOME || process.env.USERPROFILE || ""
        )
      );
      const data: string = (await readFile(config_dir)).toString("utf8");
      return data;
    } catch (error) {
      console.log("file read error, please run $./tasks-cli auth");
      this.exit();
    }
  };

  const data = (await readConfigs()) as string;
  const configs = JSON.parse(data);

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

    const data = await res.json();
    console.log(data);

    return;
  } else {
    console.log("proceed");
  }

  process.stdout.write(`example hook running ${JSON.stringify(opts.id)}\n`);
};

export default hook;
