import { assert } from 'chai';
import { getObjectType, ObjectType } from '../../src/util/getObjectType';

describe('getObjectType', () => {
    it('should detect undefined', () => {
        assert.equal(ObjectType.Undefined, getObjectType(undefined));
    });

    it('should detect null', () => {
        assert.equal(ObjectType.Null, getObjectType(null));
    });

    it('should detect a number', () => {
        assert.equal(ObjectType.Number, getObjectType(42));
    });

    it('should detect a string', () => {
        assert.equal(ObjectType.String, getObjectType(''));
    });

    it('should detect a boolean', () => {
        assert.equal(ObjectType.Boolean, getObjectType(true));
    });

    it('should detect a symbol', () => {
        assert.equal(ObjectType.Symbol, getObjectType(Symbol('test symbol')));
    });

    it('should detect a function', () => {
        assert.equal(ObjectType.Function, getObjectType(() => {}));
    });

    it('should detect NaN', () => {
        assert.equal(ObjectType.NaN, getObjectType(Number.parseInt('not a number')));
    });

    it('should detect an array', () => {
        assert.equal(ObjectType.Array, getObjectType([]));
    });

    it('should detect a date', () => {
        assert.equal(ObjectType.Date, getObjectType(new Date()));
    });

    it('should detect a map', () => {
        assert.equal(ObjectType.Map, getObjectType(new Map()));
    });

    it('should detect a set', () => {
        assert.equal(ObjectType.Set, getObjectType(new Set()));
    });

    it('should detect an object', () => {
        assert.equal(ObjectType.Object, getObjectType({}));
    });
});