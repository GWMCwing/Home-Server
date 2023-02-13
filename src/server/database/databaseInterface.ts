import {
    BulkWriteOptions,
    Collection,
    Db,
    Document,
    Filter,
    FindOptions,
    MongoClient,
    OptionalId,
    OptionalUnlessRequiredId,
    UpdateFilter,
} from 'mongodb';
import { CourseBase } from '../../res/type/CourseType';
import { User } from '../user/user';

const dataBaseName = 'expressServer';

class MongoDataBase_Base<TSchema extends Document = Document> {
    protected db: Db;
    protected collection: Collection<TSchema>;
    constructor(
        dbClient: MongoClient,
        dataBaseName: string,
        collectionName: string
    ) {
        this.db = dbClient.db(dataBaseName);
        this.collection = this.db.collection(collectionName);
    }
    //
    async findDocument(query: Filter<TSchema>, options: FindOptions = {}) {
        return this.collection.findOne(query, {
            projection: {
                _id: 0,
            },
            ...options,
        });
    }
    async findMultipleDoc(query: Filter<TSchema>, options: FindOptions = {}) {
        return this.collection.find(query, {
            projection: {
                _id: 0,
            },
            ...options,
        });
    }
    //
    async insertMultipleDoc(
        doc: OptionalUnlessRequiredId<TSchema>[],
        options: BulkWriteOptions = {}
    ) {
        return await this.collection.insertMany(doc, options);
    }
    async insertDocument(doc: OptionalUnlessRequiredId<TSchema>) {
        return await this.collection.insertOne(doc);
    }
    //
    async updateDoc(
        query: Filter<TSchema>,
        update: Partial<TSchema> | UpdateFilter<TSchema>,
        option = {}
    ) {
        return await this.collection.updateOne(query, update, option);
    }
    async updateMany(
        query: Filter<TSchema>,
        update: UpdateFilter<TSchema> = {}
    ) {
        return await this.collection.updateMany(query, update);
    }
    //
    async deleteOne(query: Filter<TSchema>) {
        return await this.collection.deleteOne(query);
    }
    async deleteMany(query: Filter<TSchema>) {
        return await this.collection.deleteMany(query);
    }
    async distinct(field: any, query: Filter<TSchema>) {
        return await this.collection.distinct(field, query);
    }
}

class UserCollection extends MongoDataBase_Base<User> {
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
class CourseCollection extends MongoDataBase_Base<CourseBase> {
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
