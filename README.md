oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g tasks-cli
$ tasks-cli COMMAND
running command...
$ tasks-cli (--version)
tasks-cli/0.0.0 linux-x64 node-v18.9.1
$ tasks-cli --help [COMMAND]
USAGE
  $ tasks-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`tasks-cli help [COMMANDS]`](#tasks-cli-help-commands)
* [`tasks-cli plugins`](#tasks-cli-plugins)
* [`tasks-cli plugins:install PLUGIN...`](#tasks-cli-pluginsinstall-plugin)
* [`tasks-cli plugins:inspect PLUGIN...`](#tasks-cli-pluginsinspect-plugin)
* [`tasks-cli plugins:install PLUGIN...`](#tasks-cli-pluginsinstall-plugin-1)
* [`tasks-cli plugins:link PLUGIN`](#tasks-cli-pluginslink-plugin)
* [`tasks-cli plugins:uninstall PLUGIN...`](#tasks-cli-pluginsuninstall-plugin)
* [`tasks-cli plugins:uninstall PLUGIN...`](#tasks-cli-pluginsuninstall-plugin-1)
* [`tasks-cli plugins:uninstall PLUGIN...`](#tasks-cli-pluginsuninstall-plugin-2)
* [`tasks-cli plugins update`](#tasks-cli-plugins-update)

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

## `tasks-cli plugins`

List installed plugins.

```
USAGE
  $ tasks-cli plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ tasks-cli plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.3.0/src/commands/plugins/index.ts)_

## `tasks-cli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ tasks-cli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ tasks-cli plugins add

EXAMPLES
  $ tasks-cli plugins:install myplugin 

  $ tasks-cli plugins:install https://github.com/someuser/someplugin

  $ tasks-cli plugins:install someuser/someplugin
```

## `tasks-cli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ tasks-cli plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ tasks-cli plugins:inspect myplugin
```

## `tasks-cli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ tasks-cli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ tasks-cli plugins add

EXAMPLES
  $ tasks-cli plugins:install myplugin 

  $ tasks-cli plugins:install https://github.com/someuser/someplugin

  $ tasks-cli plugins:install someuser/someplugin
```

## `tasks-cli plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ tasks-cli plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ tasks-cli plugins:link myplugin
```

## `tasks-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ tasks-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ tasks-cli plugins unlink
  $ tasks-cli plugins remove
```

## `tasks-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ tasks-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ tasks-cli plugins unlink
  $ tasks-cli plugins remove
```

## `tasks-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ tasks-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ tasks-cli plugins unlink
  $ tasks-cli plugins remove
```

## `tasks-cli plugins update`

Update installed plugins.

```
USAGE
  $ tasks-cli plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
