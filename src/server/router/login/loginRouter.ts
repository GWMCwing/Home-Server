import { RouterBuilder } from '../routerBuilder';
import { loginRendererCallback } from '../../render/login/loginRenderer';
// import { earlyLoginMiddleware } from '../../middleware/authentication/authSession_old';
// import { loginAuth } from './login';
import { Request, Response } from 'express';
import { authRouter_Passport } from './authPassport';
export function loginRouter() {
    return (
        new RouterBuilder()
            .setPath('/login')
            // .addMiddleware(earlyLoginMiddleware)
            .addGetRequest('/', loginRendererCallback)
            .addGetRequest('/auth', (req: Request, res: Response) => {
                res.redirect('/login');
            })
            .addPostRequest('/auth', authRouter_Passport())
            .build()
    );
}
