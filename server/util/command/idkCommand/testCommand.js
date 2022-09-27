const { CommandBuilder } = require('../CommandBuilder');
const testCommand = new CommandBuilder().setCommandName('test').setExecutionHandler(() => {
    console.log('test');
});

module.exports = { testCommand };
