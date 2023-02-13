import { randomBytes } from 'crypto';
import { Request, Response } from 'express';
import path from 'path';
import { config } from '../../../config/config';
import { SecretMaxAge } from '../../../res/value/Auth';
import { CLL } from '../../util/consoleLogging';
import { generateNavBarItemList } from '../navBar/navBarGenerator';

export const secretDict = new Map<string, string>();
const threadName = 'signup';

export function signupRendererCallback(req: Request, res: Response) {
    //TODO
    const pugObject = {
        navBarList: generateNavBarItemList(req),
    };
    // generate a secret for comparing
    const sessionSecret = randomBytes(16).toString('hex');
    const sessionSecret_pass = randomBytes(8).toString('hex');
    // TODO save to db and append expire time
    //
    secretDict.set(sessionSecret, sessionSecret_pass);
    setTimeout(() => {
        secretDict.delete(sessionSecret);
    }, SecretMaxAge);
    //
    // this is not meant to be secure.
    // this is just a temp solution for signing up
    CLL.debug(threadName, 'secret', `${sessionSecret} ${sessionSecret_pass}`);
    //
    res.cookie('auth_passport_secret', sessionSecret, {
        httpOnly: true,
        secure: true,
        signed: true,
        sameSite: 'strict',
        maxAge: SecretMaxAge,
    });
    //
    res.render(
        path.join(config.viewPath, 'login', 'signup_passport.pug'),
        pugObject
    );
}
