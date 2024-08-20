import { ChatMessage } from "~/model/chat-message";

const COMMANDS: CommandDefinition[] = [
  /**
   * Get server status.
   */
  {
    name: "status"
  },
  /**
   * Recharge energy.
   */
  {
    name: "recharge"
  },
  {
    name: "dev",
    subcommands: [
      {
        /**
         * Dev-specific status
         */
        name: "status"
      }
    ]
  }
];

type CommandDefinition = {
  name: string,
  args?: ArgDefinition[],
  subcommands?: CommandDefinition[]
};

type ArgType = "flag" | "value" | "count";

type ArgValueType = "boolean" | "number" | "string";

type ArgDefinition = {
  name: string,
  argType?: ArgType,
  argValueType?: ArgValueType,
  shouldInherit?: boolean
};

type CommandListing = {
  [k: string]: Command
};

type ArgListing = {
  [k: string]: Arg
}

type FifoQueue = string[];

type Command = {
  /**
   * The name of the command so that each command is self-descriptive.
   */
  name: string,
  /**
   * The possible args that were parse for each command.
   */
  args: ArgListing,
  /**
   * Possible subcommands that are parsable from this command. 
   */
  subcommands: CommandListing,
  note?: string,
  parents?: string[]
};

type Arg = {
  name: string,
  argType: ArgType,
  value: boolean | number | string,
  valueType: ArgValueType
};

export class Cli {
  commands: CommandListing = {
    /**
     * Sentinel command use when no other command is matched.
     */
    error: {
      name: "error",
      args: {},
      subcommands: {}
    }
  };

  constructor(commandDefinitions?: CommandDefinition[]) {
    this.#buildCommands(commandDefinitions ?? COMMANDS);
  }

  #buildCommands(commandDefinitions: CommandDefinition[]) {
    for (const cmd of commandDefinitions) {
      this.commands[cmd.name] = this.#processCommandDef(cmd);
    }
  }

  #processCommandDef(cmd: CommandDefinition): Command {
    const args: ArgListing = {}
    const inheritedArgs: ArgDefinition[] = []
    if (cmd.args) {
      for (const cmdArg of cmd.args) {
        let value = null;
        let valueType: ArgValueType = "string";
        if (cmdArg.argType) {
          if (cmdArg.argType === "flag") {
            value = false;
          }
          switch (cmdArg.argType) {
            case "flag": {
              value = false;
              break;
            }
            case "value": {
              if (cmdArg.argValueType) {
                switch (cmdArg.argValueType) {
                  case "string": {
                    break;
                  }
                  case "number": {
                    value = 0;
                    valueType = "number";
                    break;
                  }
                  case "boolean": {
                    value = false;
                    valueType = "boolean";
                  }
                }
              } else {
                value = "";
              }
              break;
            }
            case "count": {
              value = 0;
              break;
            }
          }
        }

        args[cmdArg.name] = {
          name: cmdArg.name,
          argType: cmdArg.argType ?? "value",
          // @ts-ignore resolved to concrete value before assigning
          value,
          valueType
        };

        if (cmdArg.shouldInherit) {
          inheritedArgs.push(cmdArg);
        }
      }
    }

    const subcommands: CommandListing = {};
    if (cmd.subcommands) {
      for (const subCmd of cmd.subcommands) {
        if (subCmd.args) {
          subCmd.args = subCmd.args.concat(inheritedArgs);
        } else {
          subCmd.args = inheritedArgs;
        }
        subcommands[subCmd.name] = this.#processCommandDef(subCmd);
      }
    }

    return {
      name: cmd.name,
      args,
      subcommands
    }
  }

  parse(input: string) {
    const queue = this.#toStack(input);

    const cmdName = queue.pop();
    if (cmdName === undefined) {
      const r = this.commands.error;
      r.note = "no command parsed";

      return r;
    }
    if (!Object.hasOwn(this.commands, cmdName)) {
      const r = this.commands.error;
      r.note = `command ${cmdName} not found`;

      return r;
    }

    let cmd = this.commands[cmdName];

    let param: string | undefined = undefined;
    while (true) {
      param = queue.pop();
      if (param === undefined) {
        break;
      }

      if (cmd.args && Object.hasOwn(cmd.args, param)) {
        const arg = cmd.args[param];
        switch (arg.argType) {
          case "flag": {
            arg.value = true;
            break;
          }
          case "value": {
            // TODO
            arg.value;
            break;
          }
          case "count": {
            if (!arg.value) {
              arg.value = 1;
            } else {
              // @ts-ignore it should be impossible for this to be any other type at this point
              arg.value += 1;
            }
          }
        }

        continue;
      }

      if (cmd.subcommands && Object.hasOwn(cmd.subcommands, param)) {
        let parents = [cmd.name];
        if (cmd.parents) {
          parents = cmd.parents.concat(parents);
        }
        cmd = cmd.subcommands[param];
        cmd.parents = parents;
        continue;
      }
    }

    return cmd;
  }

  /**
   * Split, clean, and reverse input so that it's a FIFO queue that can be popped.
   * @param input Uncleaned, raw string input.
   * @returns A FIFO queue of clean input.
   */
  #toStack(input: string) {
    const splitInput = input.split(" ");
    let r = [];

    for (const s of splitInput) {
      if (s.length > 0) {
        r.push(s);
      }
    }
    r.reverse();

    return r;
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("adhoc", () => {
    const cli = new Cli();

    let r = cli.parse("dev");
    expect(r.name).to.equal("dev");
    expect(r.args).to.be.empty;
    expect(r.subcommands.status).to.be.not.undefined;
  });
}
