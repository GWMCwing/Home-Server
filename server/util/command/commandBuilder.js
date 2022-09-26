/**
 * @callback commandHandler
 * @param {String[]} flags flags without '-' prefix
 * @param {String[]} args args list that user input with space split
 * @return {Number} return code
 */
/**
 * @class
 * Command class for handling and executing defined command
 */
class Command {
    /**
     *
     * @param {String} name
     * @param {Map<String, Boolean>} flags
     * @param {{flag: String, requireArg: Boolean}} args object for specifying the args property
     * @param {commandHandler} commandHandler callback for handling args and execution of the command
     */
    constructor(name, flags, args, commandHandler) {
        /** @type {String} */
        this.name = name;
        /** @type {Map<String, Boolean>} */
        this.args = new Map(args);
        /** @type {{flag: String, requireArg: Boolean}} */
        this.flags = flags;
        /** @type {commandHandler} */
        this.commandHandler = commandHandler;
    }
    warnCommandExecution(message) {}
    /**
     *
     * @param {{flag:String, args: String}|null} inputFlags
     * @param {String[]|[]} inputArgs
     * @return {Number} return code
     */
    execute(inputFlags, inputArgs) {
        // TODO check for flags

        // warn for missing
        //
        // execute command
        return this.commandHandler(inputFlags, inputArgs);
    }
}
class CommandBuilder {
    constructor() {
        /** @type {String} */
        this.name = null;
        /** @type {Map<String,Boolean>} */
        this.args = new Map();
        /** @type {{flag: String, requireArg: Boolean}} */
        this.flags = {};
        /** @type {commandHandler} */
        this.commandHandler = null;
        this.previousArgRequire = true;
    }
    setCommandName(name) {
        this.name = name;
        return this;
    }
    /**
     * @param {String} arg
     * @param {*} type
     * @returns {CommandBuilder}
     */
    setArg(arg, require = true) {
        if (!this.previousArgRequire && require) {
            throw new Error('required arg must be after optional arg');
        }
        this.args.set(arg, require);
        return this;
    }
    /**
     *
     * @param {String} flag
     * @param {Boolean} requireArg
     * @returns {CommandBuilder}
     */
    setFlag(flag, requireArg) {
        this.flags[flag] = requireArg;
        return this;
    }
    /**
     *
     * @param {commandHandler} func
     * @return {CommandBuilder}
     */
    commandHandler(func) {
        this.commandHandler = func;
        return this;
    }
    build() {
        return new Command(this.name, this.flags, this.args, this.commandHandler);
    }
}
module.exports = { CommandBuilder };
/**
 * cmdName [optional args] [required args]
 * define require args number
 * define optional args number
 * define conflict args
 * define what function for each args
 */
