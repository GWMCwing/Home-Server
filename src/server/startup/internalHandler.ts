import { CLL } from '../util/consoleLogging';

//
function setup_processHandling() {
    const threadName = 'Process Handler';
    process.on('SIGINT', function () {
        CLL.log(threadName, 'PROCESS', 'Caught interrupt signal');
        const i_should_exit = true;
        if (i_should_exit) process.exit();
    });
}
// function startTaskHandler() {}
export function startup_internalHandler() {
    setup_processHandling();
}
