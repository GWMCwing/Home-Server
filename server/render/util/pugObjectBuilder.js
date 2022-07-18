class ObjBuilder {
    #obj = {};
    build() {
        return this.#obj;
    }
    getCustom(key) {
        return this.#obj[key];
    }
    setCustom(key, value, isClassName = false) {
        this.#obj[key] = value;
        if (isClassName) this.addClassName(value);
        return this;
    }
    setClassName(className) {
        return this.setCustom('className', className);
    }
    addClassName(className) {
        const oriClassName = this.#obj['className'];
        return this.setCustom(
            'className',
            className + (oriClassName ? ' ' + oriClassName : '')
        );
    }
    setLink(link) {
        return this.setCustom('link', link);
    }
    setId(id) {
        return this.setCustom('id', id);
    }
}
module.exports = { ObjBuilder };
