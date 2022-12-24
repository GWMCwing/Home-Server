import { RouterBuilder } from '../routerBuilder';
import { loginRendererCallback } from '../../render/login/loginRenderer';
import { earlyLoginMiddleware } from '../../middleware/authentication/authSession';
import { loginAuth } from './login';
import { Request, Response } from 'express';
export function loginRouter() {
    return new RouterBuilder()
        .setPath('/login')
        .addMiddleware(earlyLoginMiddleware)
        .addGetRequest('/', loginRendererCallback)
        .addPostRequest('/auth', loginAuth)
        .addGetRequest('/auth', (req: Request, res: Response) => {
            res.redirect('/login');
        })
        .build();
}
