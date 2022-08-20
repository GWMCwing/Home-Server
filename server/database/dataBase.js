//! TODO builder for options and query
const dataBaseName = 'expressServer';
class MongoDataBase {
    constructor(dbClient, collectionName) {
        this.db = dbClient.db(dataBaseName);
        this.coll = this.db.collection(collectionName);
    }
    //
    async findDocument(query, options) {
        return await this.coll.findOne(query, {
            projection: {
                _id: 0,
            },
            ...options,
        });
    }
    async findMultipleDoc(query, options) {
        return await this.coll.find(query, {
            projection: {
                _id: 0,
            },
            ...options,
        });
    }
    //
    async insertMultipleDoc(doc, options) {
        return await this.coll.insertMany(doc, options);
    }
    async insertDocument(doc) {
        return await this.coll.insertOne(doc);
    }
    //
    async updateDoc(query, obj, option = {}) {
        return await this.coll.updateOne(query, { $set: obj }, option);
    }
    async updateMany(query, obj) {
        return await this.coll.updateMany(query, obj);
    }
    //
    async deleteOne(query) {
        return await this.coll.deleteOne(query);
    }
    async deleteMany(query) {
        return await this.coll.deleteMany(query);
    }
}
class UserCollection extends MongoDataBase {
    /** @type {UserCollection} */
    static #instance;
    constructor(dbClient) {
        if (UserCollection.#instance) return UserCollection.#instance;
        super(dbClient, 'user');
        UserCollection.#instance = this;
    }
    static getInstance() {
        return UserCollection.#instance;
    }
}
class CourseCollection extends MongoDataBase {
    /** @type {CourseCollection} */
    static #instance;
    constructor(dbClient) {
        if (CourseCollection.#instance) return CourseCollection.#instance;
        super(dbClient, 'courseList');
        CourseCollection.#instance = this;
    }
    static getInstance() {
        return CourseCollection.#instance;
    }
}
/** @type {UserCollection}*/
let userCollection;
let courseCollection;
function initiateDatabaseInterface(db) {
    userCollection = new UserCollection(db);
    courseCollection = new CourseCollection(db);
}
module.exports = {
    initiateDatabaseInterface,
    UserCollection,
    CourseCollection,
};
