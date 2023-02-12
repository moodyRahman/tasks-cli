import { Args, Command, Flags } from "@oclif/core";
import express, { Express, Request, Response } from "express";
import open from "open";
import path from "path";

export default class Auth extends Command {
  static description = "describe the command here";

  static examples = ["<%= config.bin %> <%= command.id %>"];

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({ char: "n", description: "name to print" }),
    // flag with no value (-f, --force)
    force: Flags.boolean({ char: "f" }),
  };

  static args = {
    file: Args.string({ description: "file to read" }),
  };

  public async run(): Promise<void> {
    // const {args, flags} = await this.parse(Auth)

    // const name = flags.name ?? 'world'
    // this.log(`hello ${name} from /home/moody/projects/node/tasks-cli/src/commands/auth.ts`)
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }

    new Promise((resolve, reject) => {
      const app: Express = express();
      app.get("/", (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, "../oauth/index.html"));
      });

      const server = app.listen(8443, () => {
        console.log(`Example app listening on port 8443`);
      });

      app.get("/kill", (req: Request, res: Response) => {
        res.send("killing");
        server.close();
        resolve("");
      });

      open("http://localhost:8443");
    }).then(() => {
      console.log("killed");
    });
  }
}
