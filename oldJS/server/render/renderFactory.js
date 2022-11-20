class RenderFactory {
    constructor() {}
    build(app) {
        return function () {
            app.get(this.path, this.func);
        }.bind(this);
    }
    setPath(path) {
        this.path = path;
        return this;
    }
    setCallback(func) {
        this.func = func;
        return this;
    }
}
module.exports = { RenderFactory };
