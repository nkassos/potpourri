
export enum ObjectType {
    Undefined,
    Null,
    NaN,
    Boolean,
    Number,
    BigInt,
    String,
    Symbol,
    Function,
    Object,
    Array,
    Date,
    Map,
    Set
}

export const getObjectType = (obj: any): ObjectType => {
    const type = typeof obj;

    switch (type) {
        case 'undefined':       return ObjectType.Undefined;
        case 'boolean':         return ObjectType.Boolean;
        case 'bigint':          return ObjectType.BigInt;
        case 'string':          return ObjectType.String;
        case 'symbol':          return ObjectType.Symbol;
        case 'function':        return ObjectType.Function;
        case 'number':          return isNaN(obj) ? ObjectType.NaN : ObjectType.Number
        default:
            switch (Object.prototype.toString.call(obj)) {
                case '[object Object]': return ObjectType.Object;
                case '[object Array]':  return ObjectType.Array;
                case '[object Date]':   return ObjectType.Date;
                case '[object Map]':    return ObjectType.Map;
                case '[object Set]':    return ObjectType.Set;
                case '[object Null]':   return ObjectType.Null;
                default:                throw new Error('Unknown Type');
            }
    }
};