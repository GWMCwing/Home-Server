import assert from 'assert';
import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { userCollection } from '../../database/databaseInterface';
import { User } from '../../user/user';

export async function generateToken(
    callback: (err: unknown, token: string | null) => void
) {
    crypto.randomBytes(48, function (err, buffer) {
        if (err) return callback(err, null);
        const token = buffer.toString('hex');
        return callback(null, token);
    });
}
type regenerateSessionCallback = (
    err: unknown,
    req: Request,
    res: Response
) => void;
export async function regenerateSession(
    req: Request,
    res: Response,
    user: User,
    callback: regenerateSessionCallback
) {
    generateToken(async (err, loginToken) => {
        // set on database
        if (err) return res.status(501).end();
        await userCollection.updateDoc(
            { name: user.name },
            {
                $set: { loginToken: loginToken, lastLogin: Date.now() },
            }
        );
        // set on cookie
        res.cookie('loginToken', loginToken, {
            maxAge: 14 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
        });
        // pass to callback
        return callback(null, req, res);
    });
}

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // check if the cookie exists
    const { loginToken } = req.cookies;
    if (!loginToken) return res.redirect('/login');
    const user = await userCollection.findDocument({
        loginToken: loginToken,
    });
    if (!user) return res.redirect('/login');
    // compare cookie token
    try {
        assert.strictEqual(loginToken, user.loginToken);
    } catch (err) {
        console.log(err);
        return res.redirect('/login');
    }
    // compare expire and time now
    if (user.tokenExpireTime < Date.now()) {
        return res.redirect('/login');
    }
    if (!user.isPermanent && user.accountExpireTime < Date.now()) {
        userCollection.deleteOne({ id: user.id });
        return next();
    }
    // regenerate token
    return regenerateSession(
        req,
        res,
        user as unknown as User,
        (err, req, res) => {
            if (err) return res.status(501).end();
            return next();
        }
    );
}

export async function earlyLoginMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { loginToken } = req.cookies;
    if (!loginToken) return next();
    const user = await userCollection.findDocument({
        loginToken: loginToken,
    });
    if (!user) return next();
    // compare cookie token
    try {
        assert.strictEqual(loginToken, user.loginToken);
    } catch (err) {
        console.log(err);
        return next();
    }
    // compare expire and time now
    if (user.tokenExpireTime < Date.now()) {
        return next();
    }
    if (!user.isPermanent && user.accountExpireTime < Date.now()) {
        userCollection.deleteOne({ id: user.id });
        return next();
    }
    // regenerate token
    return regenerateSession(
        req,
        res,
        user as unknown as User,
        (err, req, res) => {
            if (err) return res.status(501).end();
            return res.redirect('/dashboard');
        }
    );
}
