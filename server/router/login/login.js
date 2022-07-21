const userManager = require('../../user/userManager');
const {
    regenerateSession,
} = require('../../middleware/authentication/authSession');
const { UserCollection } = require('../../database/dataBase');
//TODO regenerate token, update user info in database
async function loginAuth(req, res) {
    const { name, password } = req.headers;
    // target path must be dashboard
    // const targetPath = req.query['targetPath'] || '';
    if (!name || !password) return res.status(401).end();
    userManager.tryAuthenticateUser(
        name,
        password,
        async (err, success, user) => {
            if (err || !success) return res.status(401).end();
            // update token
            regenerateSession(req, res, user, (err, req, res) => {
                if (err) return res.status(401).end();
                // redirect
                res.redirect('/dashboard');
            });
        }
    );
}
module.exports = { loginAuth };
