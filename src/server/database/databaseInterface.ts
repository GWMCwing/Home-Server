import {
    Collection,
    Db,
    Document,
    Filter,
    MongoClient,
    OptionalId,
} from 'mongodb';

const dataBaseName = 'expressServer';

class MongoDataBase_Base {
    protected db: Db;
    protected collection: Collection;
    constructor(
        dbClient: MongoClient,
        dataBaseName: string,
        collectionName: string
    ) {
        this.db = dbClient.db(dataBaseName);
        this.collection = this.db.collection(collectionName);
    }
    //
    async findDocument(query: Filter<Document>, options: object = {}) {
        return this.collection.findOne(query, {
            projection: {
                _id: 0,
            },
            ...options,
        });
    }
    async findMultipleDoc(query: Filter<Document>, options: object = {}) {
        return this.collection.find(query, {
            projection: {
                _id: 0,
            },
            ...options,
        });
    }
    //
    async insertMultipleDoc(doc: OptionalId<Document>[], options: object = {}) {
        return await this.collection.insertMany(doc, options);
    }
    async insertDocument(doc: OptionalId<Document>) {
        return await this.collection.insertOne(doc);
    }
    //
    async updateDoc(query: Filter<Document>, obj: object, option = {}) {
        return await this.collection.updateOne(query, { $set: obj }, option);
    }
    async updateMany(query: Filter<Document>, obj: object = {}) {
        return await this.collection.updateMany(query, obj);
    }
    //
    async deleteOne(query: Filter<Document>) {
        return await this.collection.deleteOne(query);
    }
    async deleteMany(query: Filter<Document>) {
        return await this.collection.deleteMany(query);
    }
    async distinct(field: any, query: Filter<Collection>) {
        return await this.collection.distinct(field, query);
    }
}

class UserCollection extends MongoDataBase_Base {
    static #instance: UserCollection;
    constructor(dbClient: MongoClient, dataBaseName: string) {
        if (UserCollection.#instance) return UserCollection.#instance;
        super(dbClient, dataBaseName, 'user');
        UserCollection.#instance = this;
    }
    static getInstance() {
        return UserCollection.#instance;
    }
}
class CourseCollection extends MongoDataBase_Base {
    static #instance: CourseCollection;
    constructor(dbClient: MongoClient, dataBaseName: string) {
        if (CourseCollection.#instance) return CourseCollection.#instance;
        super(dbClient, dataBaseName, 'courseList');
        CourseCollection.#instance = this;
    }
    static getInstance() {
        return CourseCollection.#instance;
    }
}
export let userCollection: UserCollection;
export let courseCollection: CourseCollection;
//
export function initiateDatabaseInterface(
    dbClient: MongoClient,
    dataBaseName: string
) {
    userCollection = new UserCollection(dbClient, dataBaseName);
    courseCollection = new CourseCollection(dbClient, dataBaseName);
}
