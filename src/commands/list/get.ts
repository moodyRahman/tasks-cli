import { Command, Args } from "@oclif/core";
import { readConfigs } from "../../utils";
import { Config, Task } from "../../types";

export default class ListGet extends Command {
  static description = "describe the command here";

  static examples = ["<%= config.bin %> <%= command.id %>"];

  static flags = {
    // flag with a value (-n, --name=VALUE)
    // name: Flags.string({ char: "n", description: "name to print" }),
    // flag with no value (-f, --force)
    // force: Flags.boolean({ char: "f" }),
  };

  static strict = false;

  static args = {
    board: Args.string({
      description: "task board to display",
      required: true,
    }),
  };

  public async run(): Promise<void> {
    const config = (await readConfigs(this)) as Config;
    const { access_token } = config;
    const { args } = await this.parse(ListGet);

    if (!("boards" in config)) {
      console.log('run "tasks-cli list" before trying to access a board');
      return;
    }

    const id = config.boards?.find((x) => x.title === args.board);

    if (id === undefined) {
      console.log(`${args.board} not found`);
      return;
    }

    const res = await fetch(
      `https://tasks.googleapis.com/tasks/v1/lists/${id?.id}/tasks`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const data = await res.json();

    const todo = data.items
      .filter((x: Task) => x.status == "needsAction")
      .map((x: Task) => x.title);

    console.log(todo);
  }
}
