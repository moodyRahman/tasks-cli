import { Hook } from "@oclif/core";
import { writeFile } from "fs/promises";
import * as dotenv from "dotenv";
import { Config, RefreshResponse } from "../../types";
import { getConfigDir, readConfigs } from "../../utils";

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
  const config_dir = getConfigDir();

  // given that we throw and kill the process if there's an issue parsing the config file,
  // we can safely cast it to a Config here
  // we also pass readConfigs a reference to this so it can kill the process if it
  // reads invalid configs
  const configs: Config = (await readConfigs(this)) as Config;

  const { expire_stamp, refresh_token, access_token } = configs;

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
  }

  // verify the access code is actually valid
  // prevents us from writing this logic in every command
  const res = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${access_token}`
  );

  if (!res.ok) {
    console.log("invalid access token, rerun tasks-cli auth");
    this.exit();
  }
};

export default hook;
