import { Hook } from "@oclif/core";
import { readFile } from "fs/promises";

const hook: Hook<"init"> = async function (opts) {
  if (opts.id === "auth") {
    console.log("we authin");
    return;
  }
  console.log("check creds!!");
  const data: string = (await readFile("./.tasks.config.json")).toString(
    "utf8"
  );
  const tokens = JSON.parse(data);
  console.log(tokens);

  process.stdout.write(`example hook running ${JSON.stringify(opts.id)}\n`);
};

export default hook;
