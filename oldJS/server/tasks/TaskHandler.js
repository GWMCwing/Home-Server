//? task handler using default micro task in nodejs
const { CLL } = require('../util/consoleLogging');
const threadName = 'TaskHandler';
/**
 * @typedef {{ fun:Function,params:*[], options: TaskOption }} task
 */
/**
 * @typedef TaskOption
 * @property {String} threadName
 * @property {Number|null} repeatCount
 * @property {Number|null} interval
 */
class TaskOptionBuilder {
    constructor() {
        /** @type {TaskOption} */
        this.option = {};
    }
    /**
     *
     * @param {String} taskName name of the task
     * @returns {TaskOptionBuilder}
     */
    setTaskName(taskName) {
        this.option.threadName = taskName;
        return this;
    }
    /**
     *
     * @param {Number} repeatCount number of times to repeat the task, -1 for infinite
     * @param {Number} interval interval between each task in milliseconds
     * @returns {TaskOptionBuilder}
     */
    setRepeat(repeatCount, interval) {
        this.option.repeatCount = repeatCount;
        this.option.interval = interval;
        return this;
    }
    /** @returns {TaskOption} */
    build() {
        return this.option;
    }
}
class TaskHandler {
    /** @type {TaskHandler} */
    static #_instance = null;
    /** @type {Map<threadName:String,Task>} */
    static #_taskQueue = new Map();
    /** @type {Number} */
    static count = 0;

    constructor() {
        if (TaskHandler.#_instance) return this.#_instance;
        this.#_instance = this;
    }
    // TODO task queue adder, remover, and runner, threadHanding and killer
    /**
     * @param {Function} fun
     * @param {*[]} params
     * @param {TaskOption} options
     */
    async addQueue(fun, params, options) {
        const { threadName, repeatCount = 1, interval = -1 } = options;
        if (TaskHandler.#_taskQueue.has(threadName)) {
            CLL.warn(
                threadName,
                'addQueue',
                `Task with name ${threadName} already exists, appending count ${TaskHandler.count} to name`
            );
            options.threadName = `${threadName}-${TaskHandler.count}`;
            TaskHandler.count++;
        }
        const task = {
            fun,
            params,
            options,
        };
        TaskHandler.#_taskQueue.set(threadName, task);
    }
    async removeFromQueue(threadName) {
        // TODO remove from queue
    }
}
//
// const taskHandler = new TaskHandler();
// module.exports = { taskHandler, TaskOptionBuilder };
