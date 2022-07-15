class User {
    constructor(userId, userName, hash, salt, expireTime) {
        this.userId = userId;
        this.userName = userName;
        this.hash = hash;
        this.salt = salt;
        this.expireTime = expireTime;
        this.isPermanent = expireTime === Infinity;
    }
}

module.exports = { User };
