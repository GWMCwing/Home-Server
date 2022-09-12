const readline = require('readline');
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
        this.#getCLIInput();
    }
    async #getCLIInput() {
        const input = await new Promise((resolve) => {
            ConsoleInputHandler.#rl.question('> ', (ans) => {
                resolve(ans);
            });
        });

        ConsoleInputHandler.CLL.log('MAIN', 'CLI', input);
        setTimeout(() => {
            this.#getCLIInput();
        }, 1);
    }
}
class ConsoleWrapper {
    constructor() {
        this.CIL = new ConsoleInputHandler(this);
    }
    // default functions
    // [HH:MM:SS] [LABEL/TYPE] [MSG]
    async assert(thread, label, ...param) {
        const prefix = '';
        process.stdout.write(prefix);
        console.assert(...param);
    }
    async debug(thread, label, ...param) {
        const prefix = `${this.#time()} [${thread}/DEBUG] [${label}] `;
        process.stdout.write(prefix);
        console.debug(...param);
    }
    async log(thread, label, ...param) {
        const prefix = `${this.#time()} [${thread}/INFO] [${label}] `;
        process.stdout.write(prefix);
        console.log(...param);
    }
    async warn(thread, label, ...param) {
        const prefix = `${this.#time()} [${thread}/WARN] [${label}] `;
        process.stdout.write(prefix);
        console.warn(...param);
    }
    async error(thread, label, ...param) {
        const prefix = `${this.#time()} [${thread}/ERROR] [${label}] `;
        process.stdout.write(prefix);
        console.error(...param);
    }
    //
    async test(label, ...param) {}
    //
    #time() {
        return `[${dateTimeFormatter.format(new Date())}]`;
    }
}
const CLL = new ConsoleWrapper();

module.exports = { CLL };
