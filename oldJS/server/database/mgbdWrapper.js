class logicalOperator {
    static NOT = '$not';
    static OR = '$or';
}
class queryOperator {
    static EQUAL = '$eq';
    static GREATER = '$gt';
    static GREATER_EQUAL = '$gte';
    static IN = '$in';
    static MATCH_ANY = queryBuilder.IN;
    static LESS = '$lt';
    static LESS_EQUAL = '$lte';
    static NOT_EQUAL = '$ne';
    static NOT_IN = '$nin';
    static MATCH_NONE = queryOption.NOT_IN;
    static MOD = '$mod';
    static EXISTS = '$exists';
}
//TODO
class queryBuilder {
    constructor() {
        this.query = {};
    }
    require(key, target, operator = queryOption.EQUAL) {
        if (!this.query[key]) this.query[key] = {};
        this.query[key][operator] = target;
        return this;
    }
}
class queryFactory {}
class updateOperator {
    static CURRENT_DATE = '$currentDate';
    static INC = '$inc';
    static MIN = '$min';
    static MAX = '$max';
    static MUL = '$mul';
    static RENAME = '$rename';
    static SET = '$set';
    static SET_ON_INSERT = '$setOnInsert';
    static UNSET = '$unset';
}
class optionBuilder {}
module.exports = { queryFactory, optionBuilder, updateOperator, queryOption };
