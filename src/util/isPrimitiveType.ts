import { ObjectType } from './getObjectType';

export function isPrimitiveType(type: ObjectType): boolean {
    return (
        type == ObjectType.Null ||
        type == ObjectType.Undefined ||
        type == ObjectType.Boolean ||
        type == ObjectType.Number ||
        type == ObjectType.BigInt ||
        type == ObjectType.Symbol ||
        type == ObjectType.String
    );
}


