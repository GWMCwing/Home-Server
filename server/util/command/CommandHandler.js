const { CommandBuilder } = require('./CommandBuilder');

const threadName = 'CommandHandler';
class CommandHandler {
    /** @type {CommandHandler} */
    static #_instance = null;
    /** @type {Map<String, Command>} */
    #commands = new Map();
    constructor(CLL) {
        if (CommandHandler.#_instance) return CommandHandler.#_instance;
        CommandHandler.#_instance = this;
        this.CLL = CLL;
        this.#buildCommand(CLL);
    }
    /**
     *
     * @param {String} input
     */
    #parseFlagAndArg(input) {
        const arg = [];
        const flag = new Map();
        const inputSplit = input.split(' ');
        const commandName = inputSplit.shift();
        const command = this.#commands.get(commandName);
        if (!command) {
            this.CLL.warn(threadName, 'Command Exec', `Command *${commandName}* not found`);
            return null;
        }
        for (let i = 0; i < inputSplit.length; i++) {
            const current = inputSplit[i];
            if (current.startsWith('-') || current.endsWith('--')) {
                const flagName = current.replace(/-/g, '');
                const flagRequireArg = command.flags.get(flagName);
                if (flagRequireArg === undefined) {
                    this.CLL.warn(
                        threadName,
                        'CommandHandler',
                        `Invalid flag, flag ${flagName} not found for command ${commandName}`
                    );
                } else {
                    if (flagRequireArg) {
                        flag.set(current, inputSplit[i + 1]);
                        i++;
                    } else {
                        flag.set(current, null);
                    }
                }
            } else {
                arg.push(current);
            }
        }
        return { command, flag, arg };
    }
    /**
     *
     * @param {String} input
     */
    async handle(input) {
        // TODO handle spaced arg
        const numberOfQuote = input.split('"').length - 1;
        if (numberOfQuote % 2 !== 0) {
            this.CLL.error(
                threadName,
                'CommandHandler',
                `Invalid command, missing closing quote, given ${numberOfQuote} quote(s), expected ${numberOfQuote + 1}`
            );
            return;
        }
        const flagArgObj = this.#parseFlagAndArg(input);
        if (!flagArgObj) return;
        const { command, flag, arg } = flagArgObj;
        command.execute(flag, arg);
    }
    #buildCommand(CLL) {
        // TODO
        CLL.log(threadName, 'Builder', 'Building command');
        const { testCommand } = require('./idkCommand/testCommand');
        this.#setCommand(testCommand);
    }
    /**
     *
     * @param {CommandBuilder} command_prebuild
     */
    #setCommand(command_prebuild) {
        const command = command_prebuild.build(this.CLL);
        this.#commands.set(command.name, command.command);
    }
}
module.exports = { CommandHandler };
