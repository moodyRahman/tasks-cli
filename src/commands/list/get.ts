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
    const { access_token } = (await readConfigs(this)) as Config;
    const { args } = await this.parse(ListGet);

    const res = await fetch(
      `https://tasks.googleapis.com/tasks/v1/lists/${args.board}/tasks`,
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
