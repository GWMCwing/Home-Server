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
const CLL = new ConsoleLogWrapper();
module.exports = { CLL };
