import { HashMap } from '../../src/Map/HashMap';
import { assert } from 'chai';
import { describe, it } from 'mocha';
import { hashCode, HashFunction } from '../../src/util/hashCode';
import { Hash } from 'crypto';

interface KeyType {
    key: string;
}

interface ValueType {
    value: string;
}

describe('HashMap', () => {

    const hashFunction: HashFunction<KeyType> = (key) => {
        return hashCode(key.key);
    };

    const key: KeyType = {
        key: 'key'
    };

    const value: ValueType = {
        value: 'value'
    };

    describe('#set', () => {
        it('Should add an element to the map, increment the size and return the map', () => {
            const map = new HashMap<KeyType, ValueType>(hashFunction);
            assert.equal(map.size, 0);

            const result = map.set(key, value);

            assert.equal(map.size, 1);
            assert.equal(result, map, 'Should return the map');
        });
    });

    describe('#get', () => {
        it('should get an element if the key creates the same hash', () => {
            const map = new HashMap<KeyType, ValueType>(hashFunction);
            map.set(key, value);

            const newKey: KeyType = {
                key: 'key'
            };

            const result = map.get(newKey);
            assert.deepEqual(result, value, 'Should return the value');
        });

        it('should return undefined if the key does not exist', () => {
            const map = new HashMap<KeyType, ValueType>(hashFunction);
            const newKey: KeyType = {
                key: 'key'
            };

            const result = map.get(newKey);
            assert.deepEqual(result, undefined, 'Should undefined');
        });
    });

    describe('#has', () => {
        it('should return true if the collection contains a key with the same hash', () => {
            const map = new HashMap<KeyType, ValueType>(hashFunction);
            map.set(key, value);

            const newKey: KeyType = {
                key: 'key'
            };

            assert.isTrue(map.has(newKey));
        });

        it('should return false if collection does not contain a key with the same hash', () => {
            const map = new HashMap<KeyType, ValueType>(hashFunction);
            const newKey: KeyType = {
                key: 'key'
            };

            assert.isFalse(map.has(newKey));
        });
    });

    describe('#delete', () =>{
        it('should delete a key if it has the same hash and return true', () => {
            const map = new HashMap<KeyType, ValueType>(hashFunction);
            map.set(key, value);
            assert.equal(1, map.size);

            const newKey: KeyType = {
                key: 'key'
            };

            assert.isTrue(map.delete(newKey));
            assert.equal(map.size, 0);
        });

        it('should return false for delete if no key matches the hash', () => {
            const map = new HashMap<KeyType, ValueType>(hashFunction);
            map.set(key, value);
            assert.equal(1, map.size);

            const newKey: KeyType = {
                key: 'newKay'
            };

            assert.isFalse(map.delete(newKey));
            assert.equal(map.size, 1);
        });
    });

    describe('#clear', () => {
        it('should remove all keys', () => {
            const map = new HashMap<KeyType, ValueType>(hashFunction);
            map.set(key, value);
            assert.equal(1, map.size);

            map.clear();
            assert.equal(map.size, 0);
        });
    });

    describe('#keys', () => {
        it('should return an iterator for all keys', () => {
            const map = new HashMap<KeyType, ValueType>(hashFunction);
            map.set(key, value);

            let count = 0;
            for(let k of map.keys()) {
                ++count;
                assert.deepEqual(k, {
                    key: 'key'
                });
            }

            assert.equal(count, map.size);
        });
    });

    describe('#values', () => {
        it('should return an iterator for the values', () => {
            const map = new HashMap<KeyType, ValueType>(hashFunction);
            map.set(key, value);

            let count = 0;
            for(let v of map.values()) {
                ++count;
                assert.deepEqual(v, {
                    value: 'value'
                });
            }

            assert.equal(count, map.size);
        });
    });

    describe('#forEach', () => {
        it('should execute the callback for each key:value pair', () => {
            const map = new HashMap<KeyType, ValueType>(hashFunction);
            map.set(key, value);

            let count = 0;
            map.forEach((v, k, m) => {
                ++count;
                assert.deepEqual(v, {
                    value: 'value'
                });

                assert.deepEqual(k, {
                    key: 'key'
                });

                assert.equal(m, map);
            });

            assert.equal(count, map.size);
        });
    });

    describe('#entries', () => {
        it('should produce an iterator for all entries', () => {
            const map = new HashMap<KeyType, ValueType>(hashFunction);
            map.set(key, value);

            let count = 0;
            for(let entry of map.entries()) {
                ++count;
                assert.deepEqual(entry, [
                    {
                        key: 'key'
                    },
                    {
                        value: 'value'
                    }
                ]);
            }

            assert.equal(count, map.size);
        });

        it('should produce an iterator using for of on the map (Symbol.Iterator)', () => {
            const map = new HashMap<KeyType, ValueType>(hashFunction);
            map.set(key, value);

            let count = 0;
            for(let entry of map) {
                ++count;
                assert.deepEqual(entry, [
                    {
                        key: 'key'
                    },
                    {
                        value: 'value'
                    }
                ]);
            }

            assert.equal(count, map.size);
        });
    });

    describe('#toString', () => {
        it('should return [object Map] when calling toString', () => {
            const map = new HashMap<KeyType, ValueType>(hashFunction);
            assert.equal(Object.prototype.toString.call(map), '[object Map]');
        });
    });

    it('should use a custom hash function', () => {
        const map: Map<KeyType, ValueType> =  new HashMap((key) => {
            return hashCode(key.key);
        });

        map.set({ key: 'key' }, { value: 'value' });

        assert.isTrue(map.has({
            key: 'key'
        }));
    });

});