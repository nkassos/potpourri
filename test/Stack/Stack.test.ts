
import { assert } from 'chai';
import { Comparator } from '../../src/util/Comparator';
import { Stack } from '../../src/Stack/Stack';

interface TestStackItem {
    item: number
    item2: number
}

const testStackItemComparator: Comparator<TestStackItem> = (item, arg) => {
    return item.item === arg.item;
}

export type TestStackGenerator = <T> (comparator?: Comparator<T>) => Stack<T>;

const testStack = (contructor: TestStackGenerator) => {
    describe('push', () => {
        it('should push the items and increment the size', () => {
            const stack: Stack<number> = contructor();
            assert.equal(stack.size(), 0);

            stack.push(1);
            assert.equal(stack.size(), 1);

            stack.push(2);
            assert.equal(stack.size(), 2);
        });
    });

    describe('pop', () => {
        it('should pop the items from the stack in first in first out order', () => {
            const stack: Stack<number> = contructor();

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

    describe('peek', () => {
        it('should return the first item without removing it', () => {
            const stack: Stack<number> = contructor();

            stack.push(1);
            stack.push(2);
            stack.push(3);

            assert.equal(stack.size(), 3);
            assert.equal(stack.peek(), 3);
            assert.equal(stack.size(), 3);
        });
    });

    describe('has', () => {
        it('should return true if the item is in the stack for primitive types with default comparator', () => {
            const stack: Stack<number> = contructor();

            stack.push(1);
            stack.push(2);
            stack.push(3);
            assert.isTrue(stack.has(3));
        });

        it('should return false if the stack does not contain the item with default comparator', () => {
            const stack: Stack<number> = contructor();

            stack.push(1);
            stack.push(2);
            stack.push(3);
            assert.isFalse(stack.has(4));
        });

        it('should return true if the stack contains the item using a custom comparator', () => {
            const stack: Stack<TestStackItem> = contructor(testStackItemComparator);

            stack.push({ item: 1, item2: 3 });
            stack.push({ item: 2, item2: 4 });
            stack.push({ item: 3, item2: 5 });
            assert.isTrue(stack.has({ item: 3 }));
        });

        it('should return false if the stack does not contain the item using a custom comparator', () => {
            const stack: Stack<TestStackItem> = contructor(testStackItemComparator);

            stack.push({ item: 1, item2: 3 });
            stack.push({ item: 2, item2: 4 });
            stack.push({ item: 3, item2: 5 });
            assert.isFalse(stack.has({ item: 4 }));
        });

        it('should return true if the stack contains the item using an override comparator', () => {
            const stack: Stack<TestStackItem> = contructor(testStackItemComparator);

            const overrideComparator: Comparator<TestStackItem> = (item, arg) => {
                return item.item2 === arg.item2;
            };

            stack.push({ item: 1, item2: 3 });
            stack.push({ item: 2, item2: 4 });
            stack.push({ item: 3, item2: 5 });
            assert.isTrue(stack.has({ item2: 3 }, overrideComparator));
        });

        it('should return false if the stack does not contain the item using an override comparator', () => {
            const stack: Stack<TestStackItem> = contructor(testStackItemComparator);

            const overrideComparator: Comparator<TestStackItem> = (item, arg) => {
                return item.item2 === arg.item2;
            };

            stack.push({ item: 1, item2: 3 });
            stack.push({ item: 2, item2: 4 });
            stack.push({ item: 3, item2: 5 });
            assert.isFalse(stack.has({ item2: 6 }, overrideComparator));
        });
    });

    describe('iterator', () => {
        it('should iterate over all elements', () => {
            const stack: Stack<number> = contructor();

            stack.push(1);
            stack.push(2);
            stack.push(3);

            let cur = 3;
            for (let val of stack.iterator()) {
                assert.equal(val, cur--);
            }

            assert.equal(0, cur);
            assert.equal(0, stack.size());
        });
    });
};

export { testStack };