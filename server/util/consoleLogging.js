const dateTimeFormatter = new Intl.DateTimeFormat([], {
    timeZone: 'Asia/Hong_Kong',
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
});
class ConsoleLogWrapper {
    constructor() {}
    // default functions
    // [HH:MM:SS] [LABEL/TYPE] [MSG]
    async assert(label, ...param) {
        const prefix = '';
        process.stdout.write(prefix);
        console.assert(...param);
    }
    async debug(label, ...param) {
        const prefix = `${this.#time()} [${label}/DEBUG] `;
        process.stdout.write(prefix);
        console.debug(...param);
    }
    async log(label, ...param) {
        const prefix = `${this.#time()} [${label}/INFO] `;
        process.stdout.write(prefix);
        console.log(...param);
    }
    async warn(label, ...param) {
        const prefix = `${this.#time()} [${label}/WARN] `;
        process.stdout.write(prefix);
        console.warn(...param);
    }
    async error(label, ...param) {
        const prefix = `${this.#time()} [${label}/ERROR] `;
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
const consoleLogWrapper = new ConsoleLogWrapper();
module.exports = { consoleLogWrapper };
