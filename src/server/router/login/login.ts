import { userManager } from '../../user/userManager';
import { regenerateSession } from '../../middleware/authentication/authSession';
import { Response, Request } from 'express';
import { User } from '../../user/user';
//TODO regenerate token, update user info in database
async function regenerateSessionCallback(
    err: unknown,
    req: Request,
    res: Response
) {
    if (err) return res.status(401).end();
    // redirect
    return res.redirect('/dashboard');
}
async function authenticateCallback(
    err: boolean | unknown,
    success: boolean,
    req: Request,
    res: Response,
    user?: User
): Promise<void> {
    if (err || !success) {
        res.status(401).end();
        return;
    }
    // update token
    return regenerateSession(
        req,
        res,
        user as unknown as User,
        regenerateSessionCallback
    );
}
export async function loginAuth(req: Request, res: Response) {
    const { name, password } = req.headers;
    // target path must be dashboard
    // const targetPath = req.query['targetPath'] || '';
    if (!name || !password) return res.status(401).end();
    return userManager.tryAuthenticateUser(
        name as string,
        password as string,
        req as Request,
        res as Response,
        authenticateCallback
    );
}
