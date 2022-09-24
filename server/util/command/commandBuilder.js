class Command {
    constructor(alias, args, actionFunc, help) {}
    isAlias(alias) {}
    execute() {}
}
class CommandBuilder {
    setArg(arg, func) {
        // what will be added to the func args when ars is passed
    }
    // setAlias(alias) {}
    setAction(func) {}
    // setHelp(help) {}
    build() {}
}
module.exports = { CommandBuilder };
