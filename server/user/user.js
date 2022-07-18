class User {
    constructor(
        id,
        name,
        passwordHash,
        salt,
        expireTime,
        lastLogin,
        cookieToken
    ) {
        this.id = id;
        this.name = name;
        this.passwordHash = passwordHash;
        this.salt = salt;
        this.expireTime = expireTime;
        this.isPermanent = expireTime === Infinity;
        this.lastLogin = lastLogin;
        this.cookieToken = cookieToken; //??
    }
}

class UserFactory {
    static BUILD_FAILED_ID = -1;
    static BUILD_FAILED_NAME = -2;
    static BUILD_FAILED_HASH = -3;
    constructor() {}
    build() {
        return (
            this.#assertCompleteness() ||
            new User(
                this.#id,
                this.#name,
                this.#passwordHash,
                this.#salt,
                this.#expireTime,
                this.#lastLogin,
                this.#cookieToken
            )
        );
    }
    setId(userId) {
        this.#id = userId;
        return this;
    }
    setName(name) {
        this.#name = name;
        return this;
    }
    setHash(passwordHash, salt) {
        this.#passwordHash = passwordHash;
        this.#salt = salt;
        return this;
    }
    setExpireTime(expireTime) {
        this.#expireTime = expireTime;
        this.#isPermanent = expireTime === Infinity;
        return this;
    }
    setLastLogin(lastLogin) {
        this.#lastLogin = lastLogin;
        return this;
    }
    setCookieToken(cookieToken) {
        this.#cookieToken = cookieToken;
        return this;
    }
    #assertCompleteness() {
        if (!this.userId) {
            console.error('User Id not set when building User');
            return UserFactory.BUILD_FAILED_ID;
        }
        if (!this.name) {
            console.error('User Name not set when building User');
            return UserFactory.BUILD_FAILED_NAME;
        }
        if (!this.passwordHash || !this.salt) {
            console.error(
                new Error('PasswordHash and Salt not set when building User')
            );
            return UserFactory.BUILD_FAILED;
        }
        return 0;
    }
}

module.exports = { User, UserFactory };
