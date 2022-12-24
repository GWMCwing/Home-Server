import readline from 'readline';
const dateTimeFormatter = new Intl.DateTimeFormat([], {
    timeZone: 'Asia/Hong_Kong',
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
});

class ConsoleWrapper {
    // constructor() {}
    async assert(thread: string, label: string, ...stringParam: string[]) {
        const prefix = '';
        process.stdout.write(prefix);
        console.assert(stringParam);
    }
    async debug(thread: string, label: string, ...stringParam: string[]) {
        const prefix = `[${this.#time()}] [${thread}/DEBUG] [${label}] `;
        process.stdout.write(prefix);
        console.debug(...stringParam);
    }
    async log(thread: string, label: string, ...stringParam: string[]) {
        const prefix = `[${this.#time()}] [${thread}/LOG] [${label}] `;
        process.stdout.write(prefix);
        console.log(...stringParam);
    }
    async warn(thread: string, label: string, ...stringParam: string[]) {
        const prefix = `[${this.#time()}] [${thread}/WARN] [${label}] `;
        process.stdout.write(prefix);
        console.warn(...stringParam);
    }
    async error(thread: string, label: string, ...stringParam: string[]) {
        const prefix = `[${this.#time()}] [${thread}/ERROR] [${label}] `;
        process.stdout.write(prefix);
        console.error(...stringParam);
    }
    #time(): string {
        return dateTimeFormatter.format(new Date());
    }
}

export const CLL = new ConsoleWrapper();
