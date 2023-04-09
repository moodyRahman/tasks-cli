import { Command } from "@oclif/core";
import { getConfigDir, readConfigs } from "../../utils";
import { Config, TasksLists } from "../../types";
import { writeFile } from "fs/promises";

export default class List extends Command {
  static description = "describe the command here";

  static examples = ["<%= config.bin %> <%= command.id %>"];

  static flags = {
    // flag with a value (-n, --name=VALUE)
    // name: Flags.string({ char: "n", description: "name to print" }),
    // flag with no value (-f, --force)
    // force: Flags.boolean({ char: "f" }),
  };

  static args = {
    // file: Args.string({ description: "file to read" }),
  };

  public async run(): Promise<void> {
    const config = (await readConfigs(this)) as Config;
    const { access_token } = config;

    // const auth = new google.auth.GoogleAuth({
    //   // Scopes can be specified either as an array or as a single, space-delimited string.
    //   scopes: [
    //     "https://www.googleapis.com/auth/tasks",
    //     "https://www.googleapis.com/auth/tasks.readonly",
    //   ],
    // });

    // const authClient = await auth.getClient();
    // google.options({ auth: authClient });

    // const task = google.tasks({
    //   version: "v1",
    //   auth: access_token,
    // });

    // const list = await task.tasklists.list();

    // console.log(list);

    const res = await fetch(
      "https://tasks.googleapis.com/tasks/v1/users/@me/lists",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!res.ok) {
      console.log("fatal error, please re-run tasks-cli auth");
      return;
    }

    const data: TasksLists = await res.json();

    console.log("the following task boards are available:");
    const boards = data.items.map((x) => {
      console.log(x.title);
      return {
        title: x.title,
        id: x.id,
      };
    });

    const new_config = { ...config, boards };

    const config_dir = getConfigDir();
    await writeFile(config_dir, JSON.stringify(new_config, null, 2));

    return;
  }
}
