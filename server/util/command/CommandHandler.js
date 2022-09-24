class CommandHandler {
    constructor() {
        this.#buildCommand();
    }
    handle(input) {
        const args = input.split(' ');
        const command = args.shift();
    }
    #buildCommand() {
        // TODO
    }
}
