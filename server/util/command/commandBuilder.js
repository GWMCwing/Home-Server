/**
 * @callback executionHandler
 * @param {Map<String,String >} flags flags without '-' prefix
 * @param {String[]} args args list that user input with space split
 * @return {Number} return code
 */

//
const threadName = 'CommandBuilder';

/**
 * @class
 * Command class for handling and executing defined command
 */
class Command {
    /**
     * @param {String} name
     * @param {Map<String, Boolean>} flags
     * @param {Map<String,Boolean>} args object for specifying the args property
     * @param {executionHandler} executionHandler callback for handling args and execution of the command
     */
    constructor(name, flags, args, requireArgsCount, executionHandler, CLL) {
        /** @type {String} */
        this.name = name;
        /** @type {Map<String, Boolean>} */
        this.args = new Map(args);
        /** @type {Map<String,Boolean>} */
        this.flags = flags;
        /** @type {executionHandler} */
        this.executionHandler = executionHandler;
        /** @type {Number} */
        this.requireArgs = requireArgsCount;
        /** @type {CLL} */
        this.CLL = CLL;
    }
    warnCommandExecution(message) {
        this.CLL.warn(threadName, 'Command Exec', message);
    }
    /**
     *
     * @param {Map<flag:String, args: String>|null} inputFlags
     * @param {String[]|[]} inputArgs
     * @return {Number} return code
     */
    execute(inputFlags, inputArgs) {
        // TODO check for flags
        // check for missing args
        if (inputArgs.length < this.requireArgs) {
            this.warnCommandExecution(
                `Missing args for command *${this.name}*, require ${this.requireArgs}, but only ${inputArgs.length} given`
            );
            return 1;
        }
        // warn for missing
        //
        // execute command
        return this.executionHandler(inputFlags, inputArgs);
    }
}
class CommandBuilder {
    /** @type {String} */
    #name = null;
    /** @type {Map<String,Boolean>} */
    #args = new Map();
    /** @type {Map<String,Boolean>} */
    #flags = new Map();
    /** @type {executionHandler} */
    #executionHandler = null;
    /** @type {Boolean} */
    #previousArgRequire = true;
    /** @type {Number} */
    #requireArgsCount = 0;
    constructor() {}
    setCommandName(name) {
        this.#name = name;
        return this;
    }
    /**
     * @param {String} arg
     * @param {Boolean} requireArg
     * @returns {CommandBuilder}
     */
    setArg(arg, require = true) {
        if (!this.#previousArgRequire && require) {
            throw new Error('required arg must be after optional arg');
        }
        if (require) this.#requireArgsCount++;
        this.#args.set(arg, require);
        return this;
    }
    /**
     *
     * @param {String} flag
     * @param {Boolean} requireArg
     * @returns {CommandBuilder}
     */
    setFlag(flag, requireArg) {
        this.#flags.set(flag, requireArg);
        return this;
    }
    /**
     *
     * @param {executionHandler} func
     * @return {CommandBuilder}
     */
    setExecutionHandler(func) {
        this.#executionHandler = func;
        return this;
    }
    /**
     * @description Do not build before passing to Command Handler, will be build by Command Handler, abstract class is required by CommandHandler
     * @returns {{name: String, command: Command}}
     */
    build(CLL) {
        if (this.#name === null || this.#executionHandler === null) {
            throw new Error(`Command not fully defined`);
        }
        if (this.#flags.size === 0) {
            CLL.warn(threadName, 'Builder', `Building Command *${this.#name}* without flags`);
        }
        if (this.#args.size === 0) {
            CLL.warn(threadName, 'Builder', `Building Command *${this.#name}* without args`);
        }
        return {
            name: this.#name,
            command: new Command(this.#name, this.#flags, this.#args, this.#requireArgsCount, this.#executionHandler),
        };
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
