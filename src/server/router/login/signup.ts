import { Request, Response } from 'express';
import {
    secretDict,
    signupRendererCallback,
} from '../../render/login/signupRenderer';
import { CLL } from '../../util/consoleLogging';
import { RouterBuilder } from '../routerBuilder';

const threadName = 'signup';
function signupHandler_passport(req: Request, res: Response) {
    // handle the signup request with the supplied secret in cookies
    const secret = req.signedCookies['auth_passport_secret'];
    if (!secret) {
        return res.status(401).end('secret not found');
    }
    // compare with db for validation, secret is generated on db only
    const secret_pass = secretDict.get(secret);
    const secret_pass_user = req.body.secret_pass;
    if (!secret_pass || !req.body || secret_pass !== secret_pass_user) {
        return res.status(401).end('secret does not match');
    }
    //TODO processed to signup
    // TODO
    //
    secretDict.delete(secret);
    return res.status(200).end('Authorized');
}

export function signupRouter() {
    return new RouterBuilder()
        .setPath('/signup')
        .addRouter(
            ...new RouterBuilder()
                .setPath('/passport')
                .addGetRequest('/', signupRendererCallback)
                .addPostRequest('/', signupHandler_passport)
                .build()
        )
        .build();
}
