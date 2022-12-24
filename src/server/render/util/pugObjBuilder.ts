import { NavBarItem } from '../navBar/navBarItem';
export class PugObjBuilder {
    #obj: Record<string, unknown> = {};
    build() {
        return this.#obj;
    }
    getCustom(key: string): unknown {
        return this.#obj[key];
    }
    setCustom(key: string, value: unknown, isClassName = false) {
        this.#obj[key] = value;
        if (isClassName) this.addClassName(value);
        return this;
    }
    setClassName(className: string) {
        return this.setCustom('className', className);
    }
    addClassName(className: unknown) {
        const oriClassName = this.#obj['className'];
        return this.setCustom(
            'className',
            className + (oriClassName ? ' ' + oriClassName : '')
        );
    }
    setLink(link: string) {
        return this.setCustom('link', link);
    }
    setId(id: string) {
        return this.setCustom('id', id);
    }
}
