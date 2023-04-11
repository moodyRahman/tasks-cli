# tasks-cli
## A simple command line interface to interact with Google Tasks
## Getting started
<!-- usage -->
```sh-session
$ npm install -g tasks-cli
$ tasks-cli COMMAND
running command...
$ tasks-cli (--version)
tasks-cli/0.0.0 linux-x64 node-v19.8.1
$ tasks-cli --help [COMMAND]
USAGE
  $ tasks-cli COMMAND
...
```
Initialize `tasks-cli` by first running
```tasks-cli auth``` to open your browser and enter your Google Oauth credentials.   
Once you're authenticated, run ```tasks-cli list``` to display and cache the task 
boards you have available right now.  
Finally, run ```tasks-cli list get "<board>"``` to display all the tasks 
associated to the `<board>`

<!-- usagestop -->
# Commands
<!-- commands -->
* [`tasks-cli auth`](#tasks-cli-auth)
* [`tasks-cli help [COMMANDS]`](#tasks-cli-help-commands)
* [`tasks-cli list`](#tasks-cli-list)
* [`tasks-cli list get BOARD`](#tasks-cli-list-get-board)

## `tasks-cli auth`

authenticate tasks-cli

```
USAGE
  $ tasks-cli auth

DESCRIPTION
  authenticate tasks-cli

EXAMPLES
  $ tasks-cli auth
```

_See code: [dist/commands/auth/index.ts](https://github.com/moodyRahman/hello-world/blob/v0.0.0/dist/commands/auth/index.ts)_

## `tasks-cli help [COMMANDS]`

Display help for tasks-cli.

```
USAGE
  $ tasks-cli help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for tasks-cli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.4/src/commands/help.ts)_

## `tasks-cli list`

describe the command here

```
USAGE
  $ tasks-cli list

DESCRIPTION
  describe the command here

EXAMPLES
  $ tasks-cli list
```

_See code: [dist/commands/list/index.ts](https://github.com/moodyRahman/hello-world/blob/v0.0.0/dist/commands/list/index.ts)_

## `tasks-cli list get BOARD`

describe the command here

```
USAGE
  $ tasks-cli list get [BOARD]

ARGUMENTS
  BOARD  task board to display

DESCRIPTION
  describe the command here

EXAMPLES
  $ tasks-cli list get
```
<!-- commandsstop -->
# Table of contents
<!-- toc -->
* [Commands](#commands)
* [Table of contents](#table-of-contents)
<!-- tocstop -->
