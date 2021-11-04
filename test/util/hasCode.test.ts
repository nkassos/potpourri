import { hashCode } from '../../src/util/hashCode';
import { assert } from 'chai';

describe('hashCode', () => {
    it('should hash a string', () => {
        const testString = 'a test string';
        const hash = hashCode(testString);
        assert.isNumber(hash);
    });
});