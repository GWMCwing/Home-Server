const { User, UserBuilder } = require('./user');
const crypto = require('crypto');
const { hash } = require('../util/common');
const { UserCollection } = require('../database/dataBase');
const assert = require('node:assert');
class UserManager {
    static #instance;
    // #userIdGenerator;
    constructor() {
        if (UserManager.#instance) {
            return UserManager.#instance;
        }
        //
        // let nextId = 1;
        // this.#userIdGenerator = this.#userIdGeneratorBuilder(nextId);
        UserManager.#instance = this;
    }
    async getUser(userName) {
        return await UserCollection.getInstance().findDocument({
            name: userName,
        });
    }
    async userExist(userName) {
        return !!(await this.getUser(userName));
    }
    async getUserId(userName) {
        const user = await this.getUser(userName);
        return user && user.id;
    }
    async isAlive(userName) {
        const user = await this.getUser(userName);
        return !!user && user.expireTime > Date.now();
    }
    async createUser(name, passwordHash, salt, ttl = 24 * 60) {
        let id;
        try {
            id = crypto.randomBytes(32).toString('hex');
        } catch (err) {
            console.error(err);
            return Promise.reject('Generate Error');
        }
        if (await this.userExist(name)) return Promise.reject('User Exists');
        const user = new UserBuilder()
            .setId(id)
            .setName(name)
            .setHash(passwordHash, salt)
            .setAccountExpireTime(ttl * 1000 * 60 + Date.now())
            .build();
        console.log(user);
        return await UserCollection.getInstance().insertDocument(user);
    }
    async tryAuthenticateUser(name, password, callback) {
        const user = await this.getUser(name);
        if (!user || user.accountExpireTime < Date.now())
            return callback(new Error('User not Found'), false, null);
        hash(
            { password: password, salt: user.salt },
            function (err, password, salt, hash) {
                if (err) return callback(err, false, null);
                try {
                    assert.strictEqual(hash, user.passwordHash);
                } catch (err) {
                    return callback(err, false, null);
                }
                console.log('success');
                callback(null, true, user);
            }
        );
    }
    // private methods
    // *#userIdGeneratorBuilder(initialId) {
    //     let nextId = initialId;
    //     while (true) {
    //         yield nextId++;
    //     }
    // }
}

module.exports = new UserManager();
