import { Args, Command, Flags } from "@oclif/core";
import express, { Express, Request, Response } from "express";
import { randomBytes, createHash } from "crypto";
import { writeFile } from "fs/promises";
import * as hbs from "hbs";
import open from "open";
import path from "path";

export default class Auth extends Command {
  static description = "describe the command here";

  static examples = ["<%= config.bin %> <%= command.id %>"];

  static flags = {
    // // flag with a value (-n, --name=VALUE)
    // name: Flags.string({ char: "n", description: "name to print" }),
    // // flag with no value (-f, --force)
    // force: Flags.boolean({ char: "f" }),
  };

  static args = {
    // file: Args.string({ description: "file to read" }),
  };

  public async run(): Promise<void> {
    // const {args, flags} = await this.parse(Auth)

    // const name = flags.name ?? 'world'
    // this.log(`hello ${name} from /home/moody/projects/node/tasks-cli/src/commands/auth.ts`)
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }

    const verifier: Buffer = randomBytes(50);
    const hash: string = createHash("sha256")
      .update(verifier)
      .digest("base64url");
    const nonce: string = randomBytes(100).toString("base64url");

    console.log(hash);

    new Promise((resolve) => {
      const app: Express = express();
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));
      app.set("view engine", "html");
      app.engine("html", hbs.__express);
      app.set("views", __dirname + "/../../oauth");

      const server = app.listen(31417, () => {
        console.log(`Example app listening on port 31417`);
      });

      app.get("/", async (req: Request, res: Response) => {
        console.log(req.query);
        const goog_res = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        res.render("oauth");
      });

      app.get("/login", (req: Request, res: Response) => {
        res.render("login.html", {
          code_challenge: hash,
          nonce: nonce,
        });
      });

      app.get("/kill", (req: Request, res: Response) => {
        res.send("killing");
        server.close();
        resolve("");
      });

      open("http://localhost:31417/login");
    }).then(() => {
      console.log("killed");
    });
  }
}
