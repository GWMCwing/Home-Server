class User {
    static PERMISSION = {
        READ: 'r',
        WRITE: 'w',
    };
    constructor(
        id,
        name,
        passwordHash,
        salt,
        accountExpireTime,
        tokenExpireTime,
        lastLogin,
        loginToken,
        permission = User.PERMISSION.READ
    ) {
        this.id = id;
        this.name = name;
        this.permission = permission;
        this.passwordHash = passwordHash;
        this.salt = salt;
        this.isPermanent = accountExpireTime === Infinity;
        this.lastLogin = lastLogin;
        this.loginToken = loginToken;
        this.accountExpireTime = accountExpireTime;
        this.tokenExpireTime = tokenExpireTime;
    }
}

const defaultTokenExpireTime = 14 * 24 * 60 * 60 * 1000;
class UserBuilder {
    static BUILD_FAILED_ID = -1;
    static BUILD_FAILED_NAME = -2;
    static BUILD_FAILED_HASH = -3;
    #obj;
    constructor() {
        this.#obj = {};
    }
    build() {
        return this.buildWithObj(this.#obj);
    }
    buildWithObj(userObj) {
        return (
            this.#assertCompleteness(userObj) ||
            new User(
                userObj.id,
                userObj.name,
                userObj.passwordHash,
                userObj.salt,
                userObj.accountExpireTime,
                userObj.tokenExpireTime || Date.now() + defaultTokenExpireTime,
                userObj.lastLogin,
                userObj.cookieToken
            )
        );
    }
    setCustom(key, value) {
        this.#obj[key] = value;
        return this;
    }
    setId(userId) {
        return this.setCustom('id', userId);
    }
    setName(name) {
        return this.setCustom('name', name);
    }
    setPermission(permission) {
        return this.setCustom('permission', permission);
    }
    setHash(passwordHash, salt) {
        return this.setCustom('passwordHash', passwordHash).setCustom(
            'salt',
            salt
        );
    }
    setAccountExpireTime(expireTime) {
        return this.setCustom('accountExpireTime', expireTime).setCustom(
            'isPermanent',
            expireTime === Infinity
        );
    }
    setTokenExpireTime(expireTime = defaultTokenExpireTime) {
        return this.setCustom('tokenExpireTime', Date.now() + expireTime);
    }
    setLastLogin(lastLogin) {
        return this.setCustom('lastLogin', lastLogin);
    }
    setCookieToken(cookieToken) {
        return this.setCustom('cookieToken', cookieToken);
    }
    #assertCompleteness(userObj) {
        if (!userObj.id) {
            console.error('User Id not set when building User');
            return UserBuilder.BUILD_FAILED_ID;
        }
        if (!userObj.name) {
            console.error('User Name not set when building User');
            return UserBuilder.BUILD_FAILED_NAME;
        }
        if (!userObj.passwordHash || !userObj.salt) {
            console.error(
                new Error('PasswordHash and Salt not set when building User')
            );
            return UserBuilder.BUILD_FAILED;
        }
        return 0;
    }
}

module.exports = { User, UserBuilder };
