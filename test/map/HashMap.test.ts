import { HashFunction, HashMap } from '../../src/map/HashMap';
import { assert } from 'chai';
import { describe, it } from 'mocha';
import { hashCode } from '../../src/util/hashCode';

interface KeyType {
    keyValue: string;
}

interface ValueType {
    value: string;
}

describe('HashMap', () => {

    const hashFunction: HashFunction<KeyType> = (key) => {
        return hashCode(key.keyValue);
    };

    const key: KeyType = {
        keyValue: 'key'
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
                keyValue: 'key'
            };

            const result = map.get(newKey);
            assert.deepEqual(result, value, 'Should return the value');
        });
    });

    it('should return true if the collection contains a key with the same hash', () => {
        const map = new HashMap<KeyType, ValueType>(hashFunction);
        map.set(key, value);

        const newKey: KeyType = {
            keyValue: 'key'
        };

        assert.isTrue(map.has(newKey));
    });

    describe('#delete', () =>{
        it('should delete a key if it has the same hash and return true', () => {
            const map = new HashMap<KeyType, ValueType>(hashFunction);
            map.set(key, value);
            assert.equal(1, map.size);

            const newKey: KeyType = {
                keyValue: 'key'
            };

            assert.isTrue(map.delete(newKey));
            assert.equal(map.size, 0);
        });

        it('should return false for delete if no key matches the hash', () => {
            const map = new HashMap<KeyType, ValueType>(hashFunction);
            map.set(key, value);
            assert.equal(1, map.size);

            const newKey: KeyType = {
                keyValue: 'newKay'
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
                    keyValue: 'key'
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
                    keyValue: 'key'
                });

                assert.equal(m, map);
            });

            assert.equal(count, map.size);
        });
    });

    describe('#entries', () => {
        it('should produce an interator for all entries', () => {
            const map = new HashMap<KeyType, ValueType>(hashFunction);
            map.set(key, value);

            let count = 0;
            for(let entry of map.entries()) {
                ++count;
                assert.deepEqual(entry, [
                    {
                        keyValue: 'key'
                    },
                    {
                        value: 'value'
                    }
                ]);
            }

            assert.equal(count, map.size);
        });
    });

});