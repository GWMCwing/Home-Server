import express, { Request, Response, NextFunction } from 'express';
// TODO display routing tree
class RouterBase {
    static #routerMap = {};
    addRouterPath() {
        // TODO
    }
}
type MiddlewareCallbackFunction = (
    req: Request,
    res: Response,
    next: NextFunction
) => void;
type RouterCallbackFunction = (req: Request, res: Response) => void;
export class RouterBuilder extends RouterBase {
    #router: express.Router;
    #path: string;
    constructor() {
        super();
        this.#router = express.Router();
        this.#path = '/';
    }
    build(): [string, express.Router] {
        return [this.#path, this.#router];
    }
    /**
     *
     * @param {String} path set the path of the router (relative to the parent router)
     * @returns {RouterBuilder}
     */
    setPath(path: string) {
        this.#path = path;
        return this;
    }
    /**
     *
     * @param {String} path set the path of the router (relative to the parent router)
     * @param {Router} router
     * @returns {RouterBuilder}
     */
    addRouter(path: string, router: express.Router) {
        this.#router.use(path, router);
        return this;
    }
    addMiddleware(callback: MiddlewareCallbackFunction) {
        this.#router.use(callback);
        return this;
    }
    addGetRequest(path: string, callback: RouterCallbackFunction) {
        this.#router.get(path, callback);
        return this;
    }
    addPostRequest(path: string, callback: RouterCallbackFunction) {
        this.#router.post(path, callback);
        return this;
    }
    addPutRequest(path: string, callback: RouterCallbackFunction) {
        this.#router.put(path, callback);
        return this;
    }
}
