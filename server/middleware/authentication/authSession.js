// https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
// regenerate cookie at request
const assert = require('node:assert');
const crypto = require('crypto');
const { UserCollection } = require('../../database/dataBase');
async function generateToken(callback) {
    crypto.randomBytes(48, function (err, buffer) {
        if (err) return callback(err, null);
        let token = buffer.toString('hex');
        return callback(null, token);
    });
}
async function regenerateSession(req, res, user, callback) {
    // get a new token
    generateToken(async (err, loginToken) => {
        // set on database
        if (err) return res.status(500).end();
        await UserCollection.getInstance().updateDoc(
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
        callback(null, req, res);
    });
}
// authenticate by cookie, if cookie does not match, redirect to login page
async function authMiddleware(req, res, next) {
    // check if the cookie exists
    const { loginToken } = req.cookies;
    if (!loginToken) return res.redirect('/login');
    let user = await UserCollection.getInstance().findDocument({
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
    if (!user.isPermanent && user.tokenExpireTime < Date.now()) {
        return res.redirect('/login');
    }
    if (user.accountExpireTime < Date.now()) {
        UserCollection.getInstance().deleteOne({ id: user.id });
        return next();
    }
    // regenerate token
    return regenerateSession(req, res, user, (err, req, res) => {
        if (err) return res.status(501).end();
        next();
    });
}
async function earlyLoginMiddleware(req, res, next) {
    const { loginToken } = req.cookies;
    if (!loginToken) return next();
    let user = await UserCollection.getInstance().findDocument({
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
    if (!user.isPermanent && user.tokenExpireTime < Date.now()) {
        return next();
    }
    if (user.accountExpireTime < Date.now()) {
        UserCollection.getInstance().deleteOne({ id: user.id });
        return next();
    }
    // regenerate token
    return regenerateSession(req, res, user, (err, req, res) => {
        if (err) return res.status(501).end();
        return res.redirect('/dashboard');
    });
}
module.exports = { authMiddleware, regenerateSession, earlyLoginMiddleware };
