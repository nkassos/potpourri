import { consistentStringify } from '../../src/util/consistentStringify';
import { assert } from 'chai';

describe('consistentStringify', () => {
    it('should stringify in alphabetical order regardless of order of addition', () => {
        const obj = {
            c: 'c',
            b: 'b',
            a: 'a'
        };

        const obj2 = {
            a: 'a',
            b: 'b',
            c: 'c'
        };

        const json = consistentStringify(obj);
        const json2 = consistentStringify(obj2);

        console.log(json);
        console.log(json2);

        assert.equal(json, json2);
    });

    it('should recursively stringify objects', () => {
        const obj = {
            a: 'a',
            b: 'b',
            c: {
                a1: 'a1',
                b1: 'b1',
                c1: 'c1'
            }
        };

        const obj2 = {
            c: {
                c1: 'c1',
                b1: 'b1',
                a1: 'a1'
            },
            b: 'b',
            a: 'a'
        };

        const json = consistentStringify(obj);
        const json2 = consistentStringify(obj2);

        console.log(json);
        console.log(json2);

        assert.equal(json, json2);
    });

    it('should order object within arrays', () => {
        const obj = {
            b: 'b',
            a: [
                {
                    b: 'b',
                    a: 'a'
                }
            ]
        };

        const obj2 = {
            a: [
                {
                    a: 'a',
                    b: 'b'
                }
            ],
            b: 'b'
        };

        const json = consistentStringify(obj);
        const json2 = consistentStringify(obj2);

        console.log(json);
        console.log(json2);

        assert.equal(json, json2);
    });
});