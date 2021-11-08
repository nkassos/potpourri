import type { Stack } from '../../src/Stack/Stack';
import { LinkedStack } from '../../src';
import { assert } from 'chai';

describe('LinkedStack tests', () => {
    describe('push', () => {
        it('should push the items and increment the size', () => {
            const stack: Stack<number> = new LinkedStack();
            assert.equal(stack.size(), 0);

            stack.push(1);
            assert.equal(stack.size(), 1);

            stack.push(2);
            assert.equal(stack.size(), 2);
        });
    });

    describe('pop', () => {
        it('should pop the items from the stack in first in first out order', () => {
            const stack: Stack<number> = new LinkedStack();

            stack.push(1);
            stack.push(2);
            stack.push(3);
            assert.equal(stack.size(), 3);

            assert.equal(stack.pop(), 3);
            assert.equal(stack.size(), 2);

            assert.equal(stack.pop(), 2);
            assert.equal(stack.size(), 1);

            assert.equal(stack.pop(), 1);
            assert.equal(stack.size(), 0);

            assert.equal(stack.pop(), undefined);
            assert.equal(stack.size(), 0);
        });
    });

    describe('iterator', () => {
        it('should do it', () => {
            const stack: Stack<number> = new LinkedStack();

            stack.push(1);
            stack.push(2);
            stack.push(3);

            const iterator = stack.iterator();
            let expected = 3;
            for(let val of iterator) {
                assert.equal(val, expected--);
            }
            assert.equal(expected, 0);
            assert.equal(stack.size(), 0);
        });
    });
});