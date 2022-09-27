const readline = require('readline');
const { CommandHandler } = require('../util/command/CommandHandler');
const dateTimeFormatter = new Intl.DateTimeFormat([], {
    timeZone: 'Asia/Hong_Kong',
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
});
class ConsoleInputHandler {
    static #rl = null;
    static CLL = null;
    constructor(CLL) {
        if (ConsoleInputHandler.#rl === null) {
            ConsoleInputHandler.#rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            ConsoleInputHandler.#rl.on('SIGINT', () => {
                ConsoleInputHandler.#rl.close();
                process.emit('SIGINT');
            });
        }
        if (ConsoleInputHandler.CLL === null) ConsoleInputHandler.CLL = CLL;
        this.commandHandler = new CommandHandler(CLL);
        this.#getCLIInput();
    }
    async #getCLIInput() {
        const input = await new Promise((resolve) => {
            ConsoleInputHandler.#rl.question('> ', (ans) => {
                //
                resolve(ans);
            });
        });
        this.commandHandler.handle(input);

        // ConsoleInputHandler.CLL.log('MAIN', 'CLI', input);
        setTimeout(() => {
            this.#getCLIInput();
        }, 1);
    }
}
class ConsoleWrapper {
    constructor() {
        this.CIL = new ConsoleInputHandler(this);
    }
    setCommandHandler(commandHandler) {
        this.CIL.setCommandHandler(commandHandler);
    }
    // default functions
    // [HH:MM:SS] [LABEL/TYPE] [MSG]
    async assert(thread, label, ...stringParam) {
        const prefix = '';
        process.stdout.write(prefix);
        console.assert(...stringParam);
    }
    async debug(thread, label, ...stringParam) {
        const prefix = `${this.#time()} [${thread}/DEBUG] [${label}] `;
        process.stdout.write(prefix);
        console.debug(...stringParam);
    }
    async log(thread, label, ...stringParam) {
        const prefix = `${this.#time()} [${thread}/INFO] [${label}] `;
        process.stdout.write(prefix);
        console.log(...stringParam);
    }
    async warn(thread, label, ...stringParam) {
        const prefix = `${this.#time()} [${thread}/WARN] [${label}] `;
        process.stdout.write(prefix);
        console.warn(...stringParam);
    }
    async error(thread, label, ...stringParam) {
        const prefix = `${this.#time()} [${thread}/ERROR] [${label}] `;
        process.stdout.write(prefix);
        console.error(...stringParam);
    }
    //
    async test(label, ...stringParam) {}
    //
    #time() {
        return `[${dateTimeFormatter.format(new Date())}]`;
    }
}
const CLL = new ConsoleWrapper();

module.exports = { CLL };
