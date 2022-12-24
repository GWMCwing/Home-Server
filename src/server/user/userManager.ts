import assert from 'assert';
import crypto from 'crypto';
import { hash } from '../util/common';
import { userCollection } from '../database/databaseInterface';
import { User, UserBuilder } from '../user/user';
import { CLL } from '../util/consoleLogging';
import { Request, Response } from 'express';

type authenticationCallback = (
    err: boolean | unknown,
    success: boolean,
    req: Request,
    res: Response,
    user?: User
) => void;
class UserManager {
    static #instance: UserManager;
    constructor() {
        if (UserManager.#instance) return UserManager.#instance;
        UserManager.#instance = this;
    }
    async getUser(username: string) {
        return (await userCollection.findDocument({
            name: username,
        })) as unknown as User;
    }
    async userExist(username: string) {
        return (await this.getUser(username)) !== null;
    }
    async getUserId(username: string) {
        const user = await this.getUser(username);
        return user ? user.id : null;
    }
    async isAlive(username: string) {
        const user = await this.getUser(username);
        return user && user.expireTime.getTime() > Date.now();
    }
    async createUser(
        name: string,
        passwordHash: string,
        salt: string,
        ttl: number = 24 * 60
    ) {
        if (await this.userExist(name)) return Promise.reject('User Exist');
        let id: string;
        try {
            id = crypto.randomBytes(32).toString('hex');
        } catch (err: unknown) {
            CLL.error('User Manager', 'CreateUser', err as string);
            return Promise.reject('Generate Error');
        }
        const user = new UserBuilder()
            .setId(id)
            .setName(name)
            .setHash(passwordHash, salt)
            .build();
        if (!user) return Promise.reject('User Build Error');
        return await userCollection.insertDocument(user);
    }

    async tryAuthenticateUser(
        name: string,
        password: string,
        req: Request,
        res: Response,
        callback: authenticationCallback
    ) {
        const user = await this.getUser(name);
        if (
            !user ||
            (!user.isPermanent && user.accountExpireTime.getTime() < Date.now())
        )
            return callback(new Error('User not Found'), false, req, res);
        hash(
            { password: password, salt: user.salt },
            function (err: any, password: any, salt: any, hash: any) {
                if (err) return callback(err, false, req, res);
                try {
                    assert.strictEqual(hash, user.passwordHash);
                } catch (err) {
                    return callback(err, false, req, res);
                }
                callback(null, true, req, res, user);
            }
        );
    }
}
export const userManager = new UserManager();
