const express = require('express');
class RouterBuilder {
    #router;
    #path;
    constructor() {
        this.#router = express.Router();
    }
    build() {
        return [this.#path, this.#router];
    }
    setPath(path) {
        this.#path = path;
        return this;
    }
    addRouter(path, router) {
        this.#router.use(path, router);
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
