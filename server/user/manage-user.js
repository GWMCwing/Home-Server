import fs from 'fs';
const { User } = require('./user');
const hash = require('pbkdf2-password')();
const pathToUserListJson = __dirname + '/userList.json';
//TODO getter for private class ?
class UserManager {
    static #_instance = null;
    static #userList = {};
    /**
     * @type Generator
     */
    static #userIdGenerator = null;
    static ERROR_USER_NOT_FOUND = 'Error: User not found';
    static ERROR_USER_LIST_NOT_INITIATED = 'Error: User list not Initiated';
    static ERROR_USER_ALREADY_IN_LIST = 'Error: User Already in List';
    constructor() {
        if (UserManager.#_instance) {
            return UserManager.#_instance;
        }
        try {
            const nextId = this.#reloadUserListSync() + 1;
            // UserManager.#userList = {};
            UserManager.#userIdGenerator = this.#userIdGeneratorBuilder(nextId);
        } catch (error) {
            throw error;
        }
    }
    *#userIdGeneratorBuilder(initialId) {
        let nextId = initialId;
        while (true) {
            yield nextId++;
        }
    }
    logUserList() {
        console.log(UserManager.#userList);
    }
    async authenticate(userName, userPassword, callback) {
        //TODO check
        const user = await this.getUser(userName);
        if (!user) callback(new Error(this.ERROR_USER_NOT_FOUND));
        hash(
            { password: userPassword, salt: user.salt },
            function (err, password, salt, userPasswordHash) {
                if (err) return callback(err);
                if (user.hash === userPasswordHash) return callback(null, user);
                callback(new Error(this.ERROR_USER_NOT_FOUND));
            }
        );
    }
    #reloadUserListSync() {
        // const userListJson = JSON.parse(
        //     fs.readFileSync(pathToUserListJson, 'utf8')
        // );
        let userListJson,
            maxUserId = -1;
        try {
            userListJson = require(pathToUserListJson);
        } catch (err) {
            console.warn('User List not Found');
            console.warn('Creating empty userListJson');
            fs.writeFileSync(pathToUserListJson, '{}');
            userListJson = {};
        }
        for (const [userNameKey, userJson] of Object.entries(userListJson)) {
            const { userId, userName, hash, salt, expireTime } = userJson;
            if (userId > maxUserId) maxUserId = userId;
            UserManager.#userList[userNameKey] = new User(
                userId,
                userName,
                hash,
                salt,
                expireTime ? expireTime : Infinity
            );
        }
        return maxUserId;
    }

    // alternative new ClassName();
    static async getInstance() {
        if (!this.#_instance) return new UserManager();
        return this.#_instance;
    }

    async getUser(userName) {
        return UserManager.#userList[userName];
    }
    async UserExist(userName) {
        return !!UserManager.#userList[userName];
    }
    async getUserId(userName) {}

    async isAlive(userId) {}

    async createUser_CLI(userName, userPassword, ttl = Infinity) {
        hash({ password: userPassword }, (_err, password, _salt, hash) => {
            if (_err) return console.log(err);
            this.createUser(userName, hash, _salt, ttl);
        });
        return this;
    }
    /**
     *
     * @param {string} userName
     * @param {string} userPasswordHash
     * @param {string} salt
     * @param {number} ttl
     * @param {function} callback
     * @returns callback()
     */
    async createUser(
        userName,
        userPasswordHash,
        salt,
        ttl = 60,
        callback = (err, user) => {
            if (err) console.log(err);
            return user;
        }
    ) {
        const userId = UserManager.#userIdGenerator.next().value;
        if (await this.UserExist(userName))
            return callback(new Error(UserManager.ERROR_USER_ALREADY_IN_LIST));
        const user = new User(
            userId,
            userName,
            userPasswordHash,
            salt,
            ttl * 1000 * 60 + Date.now()
        );
        UserManager.#userList[userName] = user;
        this.exportUserList().catch((err) => {
            console.error(err);
        });
        return callback(null, user);
    }

    async createTempUser(
        userName,
        userPassword,
        salt,
        ttl = 60 // in minutes
    ) {
        return await this.createUser(userName, userPassword, salt, ttl);
    }
    async exportUserList() {
        if (!UserManager.#userList)
            return new Error(this.ERROR_USER_LIST_NOT_INITIATED);
        fs.writeFileSync(
            pathToUserListJson,
            JSON.stringify(UserManager.#userList, null, 2)
        );
    }
    async clearTempUser(userId = undefined) {
        throw 'Method not implemented';
    }

    async removeUser(...argv) {
        throw 'Method not implemented';
    }
}

export { UserManager };
