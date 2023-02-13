import { userCollection } from '../../database/databaseInterface';

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { pbkdf2, timingSafeEqual } from 'crypto';
import { CLL } from '../../util/consoleLogging';

passport.use(
    new LocalStrategy(function verify(username, password, cb) {
        userCollection
            .findDocument({
                userName: username,
            })
            .then(
                (user) => {
                    if (!user)
                        return cb(null, false, {
                            message: 'Incorrect username or password',
                        });
                    pbkdf2(
                        password,
                        user.salt,
                        310000,
                        32,
                        'sha256',
                        function (err, hashedPassword) {
                            if (err) return cb(err);
                            if (
                                !timingSafeEqual(
                                    Buffer.from(user.hashed_password),
                                    hashedPassword
                                )
                            ) {
                                return cb(null, false, {
                                    message: 'Incorrect username or password',
                                });
                            }
                            return cb(null, user);
                        }
                    );
                },
                (err) => {
                    return cb(err);
                }
            )
            .catch((err) => {
                CLL.error('AUTH', 'Verify', err);
            });
    })
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser(function (user: any, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username });
    });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.deserializeUser(function (user: any, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

export function authRouter_Passport() {
    return passport.authenticate('local', {
        successReturnToOrRedirect: '/dashboard',
        failureRedirect: '/login',
        failureMessage: true,
    });
}
