export enum UserPermission {
    READ = 'r',
    WRITE = 'w',
}
const DEFAULT_TOKEN_EXPIRE_TIME = 14 * 24 * 60 * 60 * 1000; // 14 days
const DEFAULT_USER_PERMISSION = UserPermission.READ;
//
const INVALID_USER_ID = '';
const INVALID_USER_NAME = '';
const INVALID_USER_PASSWORD_HASH = '';
const INVALID_USER_SALT = '';
const INVALID_USER_ACCOUNT_EXPIRE_TIME = new Date(0);
const INVALID_USER_TOKEN_EXPIRE_TIME = new Date(0);
const INVALID_USER_LAST_LOGIN_TIME = new Date(0);
const INVALID_USER_LOGIN_TOKEN = '';
//
export class User {
    #id: string;
    #name: string;
    #passwordHash: string;
    #salt: string;
    #isPermanent: boolean;
    #accountExpireTime: Date;
    #tokenExpireTime: Date;
    #lastLoginTime: Date;
    #loginToken: string;
    #permission: UserPermission;
    constructor(
        id: string,
        name: string,
        passwordHash: string,
        salt: string,
        accountExpireTime: Date,
        tokenExpireTime: Date,
        lastLoginTime: Date,
        loginToken: string,
        permission: UserPermission
    ) {
        this.#id = id;
        this.#name = name;
        this.#passwordHash = passwordHash;
        this.#salt = salt;
        this.#isPermanent = accountExpireTime === null;
        this.#lastLoginTime = lastLoginTime;
        this.#loginToken = loginToken;
        this.#accountExpireTime = accountExpireTime;
        this.#permission = permission;
        this.#tokenExpireTime = tokenExpireTime;
    }
    //
    get id() {
        return this.#id;
    }
    get name() {
        return this.#name;
    }
    get expireTime() {
        return this.#tokenExpireTime;
    }
    get isPermanent() {
        return this.#isPermanent;
    }
    get accountExpireTime() {
        return this.#accountExpireTime;
    }
    get salt() {
        return this.#salt;
    }
    get passwordHash() {
        return this.#passwordHash;
    }
}
export class UserBuilder {
    #id: string;
    #name: string;
    #passwordHash: string;
    #salt: string;
    #isPermanent: boolean;
    #accountExpireTime: Date;
    #tokenExpireTime: Date;
    #lastLoginTime: Date;
    #loginToken: string;
    #permission: UserPermission;
    constructor() {
        this.#id = INVALID_USER_ID;
        this.#name = INVALID_USER_NAME;
        this.#passwordHash = INVALID_USER_PASSWORD_HASH;
        this.#salt = INVALID_USER_SALT;
        this.#isPermanent = false;
        this.#accountExpireTime = INVALID_USER_ACCOUNT_EXPIRE_TIME;
        this.#tokenExpireTime = INVALID_USER_TOKEN_EXPIRE_TIME;
        this.#lastLoginTime = INVALID_USER_LAST_LOGIN_TIME;
        this.#loginToken = INVALID_USER_LOGIN_TOKEN;
        this.#permission = DEFAULT_USER_PERMISSION;
    }
    build() {
        if (this.assertValid()) {
            return new User(
                this.#id,
                this.#name,
                this.#passwordHash,
                this.#salt,
                this.#accountExpireTime as Date,
                this.#tokenExpireTime as Date,
                this.#lastLoginTime as Date,
                this.#loginToken,
                this.#permission
            );
        } else {
            return null;
        }
    }
    assertValid(): boolean {
        return (
            this.#id !== INVALID_USER_ID &&
            this.#name !== INVALID_USER_NAME &&
            this.#passwordHash !== INVALID_USER_PASSWORD_HASH &&
            this.#salt !== INVALID_USER_SALT &&
            this.#accountExpireTime !== INVALID_USER_ACCOUNT_EXPIRE_TIME &&
            this.#tokenExpireTime !== INVALID_USER_TOKEN_EXPIRE_TIME &&
            this.#lastLoginTime !== INVALID_USER_LAST_LOGIN_TIME &&
            this.#loginToken !== INVALID_USER_LOGIN_TOKEN
        );
    }
    setId(id: string) {
        this.#id = id;
        return this;
    }
    setName(name: string) {
        this.#name = name;
        return this;
    }
    setHash(passwordHash: string, salt: string) {
        this.#passwordHash = passwordHash;
        this.#salt = salt;
        return this;
    }
    setPermanent(isPermanent: boolean) {
        this.#isPermanent = isPermanent;
        return this;
    }
    setAccountExpireTime(accountExpireTime: Date) {
        this.#accountExpireTime = accountExpireTime;
        return this;
    }
    setTokenExpireTime(tokenExpireTime: Date) {
        this.#tokenExpireTime = tokenExpireTime;
        return this;
    }
    setLastLoginTime(lastLoginTime: Date) {
        this.#lastLoginTime = lastLoginTime;
        return this;
    }
    setLoginToken(loginToken: string) {
        this.#loginToken = loginToken;
        return this;
    }
    setPermission(permission: UserPermission) {
        this.#permission = permission;
        return this;
    }
}
