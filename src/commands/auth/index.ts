import { Command } from "@oclif/core";
import express, { Express, Request, Response } from "express";
import { randomBytes, createHash } from "crypto";
import { writeFile } from "fs/promises";
import * as hbs from "hbs";
import open from "open";
import * as dotenv from "dotenv";

dotenv.config({
  path: __dirname + "/../../../.env",
  debug: true,
});

export default class Auth extends Command {
  static description = "authenticate tasks-cli";

  static examples = ["<%= config.bin %> <%= command.id %>"];

  static flags = {
    // // flag with a value (-n, --name=VALUE)
    // name: Flags.string({ char: "n", description: "name to print" }),
    // // flag with no value (-f, --force)
    // force: Flags.boolean({ char: "f" }),
    // config_dir: Flags.string(),
  };

  static args = {
    // file: Args.string({ description: "file to read" }),
  };

  public async run(): Promise<void> {
    // const { flags } = await this.parse(Auth);

    const config_dir = "./.tasks.config.json";
    // this.log(`hello ${name} from /home/moody/projects/node/tasks-cli/src/commands/auth.ts`)
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }

    // generate code challenge and nonce for oauth
    const verifier: string = randomBytes(50).toString("hex");
    const hash: string = createHash("sha256")
      .update(verifier)
      .digest("base64url");
    const nonce: string = randomBytes(100).toString("base64url");

    /**
    so this is pretty interesting, by wrapping express around a Promise, i can
    keep a server running indefinitely until I call a kill route, thus unblocking
    the program and proceeding with whatever needs to be done next
     */
    new Promise((resolve) => {
      const app: Express = express();
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));
      app.set("view engine", "html");
      app.engine("html", hbs.__express);
      app.set("views", __dirname + "/../../oauth");

      const server = app.listen(31417, () => {
        console.log(`Starting authentication server...`);
      });

      // inital page with login button
      app.get("/login", (req: Request, res: Response) => {
        res.render("login.html", {
          client_id: process.env.GOOGLE_OAUTH_ID,
          code_challenge: hash,
          nonce: nonce,
        });
      });

      // this page gets all the sensitive data
      app.get("/", async (req: Request, res: Response) => {
        const { code } = req.query;

        const goog_res = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: process.env.GOOGLE_OAUTH_ID,
            client_secret: process.env.GOOGLE_OAUTH_SECRET,
            code: code,
            code_verifier: verifier,
            grant_type: "authorization_code",
            redirect_uri: "http://127.0.0.1:31417",
          }),
        });

        if (!goog_res.ok) {
          console.log("oauth failed");
          return;
        }

        type OauthResponse = {
          access_token: string;
          expires_in: number;
          refresh_token: string;
          scope: string;
          token_type: string;
        };

        const data: OauthResponse = await goog_res.json();
        console.log(Date.now());
        console.log(data.expires_in);
        console.log(data.expires_in + Date.now());
        const out = {
          ...data,
          expire_stamp: data.expires_in * 1000 + Date.now(),
        };

        await writeFile(config_dir, JSON.stringify(out, null, 2));
        res.render("oauth");
        server.close();
        console.log("Successfully authenticated!");
        resolve("");
      });

      open("http://localhost:31417/login");
    });
  }
}
