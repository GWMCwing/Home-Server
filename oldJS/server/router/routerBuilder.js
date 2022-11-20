const express = require('express');
// TODO display routing tree
class RouterBase {
    static #routerMap = {};
    addRouterPath() {}
}
class RouterBuilder extends RouterBase {
    #router;
    #path;
    constructor() {
        super();
        this.#router = express.Router();
    }
    build() {
        return [this.#path, this.#router];
    }
    /**
     *
     * @param {String} path set the path of the router (relative to the parent router)
     * @returns {RouterBuilder}
     */
    setPath(path) {
        this.#path = path;
        return this;
    }
    /**
     *
     * @param {String} path set the path of the router (relative to the parent router)
     * @param {Router} router
     * @returns {RouterBuilder}
     */
    addRouter(path, router) {
        this.#router.use(path, router);
        return this;
    }
    addMiddleware(callback) {
        this.#router.use(callback);
        return this;
    }
    addGetRequest(path, callback) {
        this.#router.get(path, callback);
        return this;
    }
    addPostRequest(path, callback) {
        this.#router.post(path, callback);
        return this;
    }
    addPutRequest(path, callback) {
        this.#router.put(path, callback);
        return this;
    }
}
module.exports = { RouterBuilder };
