import { LinkedList } from '../../src/List/LinkedList';
import {assert} from 'chai';

describe('LinkedList tests', () => {
    describe('push', () => {
        it('should push an element to the end, increment the size, and return the list', () => {
            const list = new LinkedList<number>();
            assert.equal(0, list.size());

            assert.equal(list.push(1), list);
            assert.equal(1, list.size());

            list.push(2);
            assert.equal(2, list.size());

            assert.equal(1, list.get(0));
            assert.equal(2, list.get(1));
        });
    });

    describe('pop',  () => {
        it('should pop the elements in last in first out order', () => {
            const list = new LinkedList<number>();

            list.push(1);
            list.push(2);
            list.push(3);
            assert.equal(3, list.size());

            assert.equal(3, list.pop());
            assert.equal(2, list.size());

            assert.equal(2, list.pop());
            assert.equal(1, list.size());

            assert.equal(1, list.pop());
            assert.equal(0, list.size());
        });
    });

    describe('shift', () => {
        it('should push an element to the beginning, increment the size, and return this list', () => {
            const list = new LinkedList<number>();
            assert.equal(0, list.size());

            assert.equal(list.shift(1), list);
            assert.equal(1, list.size());

            list.shift(2);
            assert.equal(2, list.size());

            assert.equal(2, list.get(0));
            assert.equal(1, list.get(1));
        });
    });


    describe('iterator', () => {
        it('should iterate over all elements', () => {
            const list = new LinkedList<number>();
            list.push(1)
                .push(2)
                .push(3)
                .push(4)
                .push(5);

            let curNum: number = 0;
            for (let num of list.iterator()) {
                ++curNum;
                assert.equal(num, curNum);
            }

            assert.equal(5, curNum);
        });
    });

    describe('forEach', () => {
        it('should execute a function on all elements', () => {
            const list = new LinkedList<number>();
            list.push(1)
                .push(2)
                .push(3)
                .push(4)
                .push(5);

            let count = 0;
            list.forEach((item) => {
                count++;
                assert.equal(item, count, 'Should be an incrementing number');
            });

            assert.equal(count, list.size(), 'Should have iterated over every element of the list');
        });

        it('should exit early when false is returned', () => {
            const list = new LinkedList<number>();
            list.push(1)
                .push(2)
                .push(3)
                .push(4)
                .push(5);

            let count = 0;
            list.forEach((item) => {
                count++;
                return item !== 3;
            });

            assert.equal(count, 3, 'Should have only executed three times');
        });

        it('should execute an async function for each element', (done) => {
            const list = new LinkedList<number>();
            list.push(1)
                .push(2)
                .push(3)
                .push(4)
                .push(5);

            let count = 0;
            list.forEachAsync(async (item) => {
                count++;
                assert.equal(item, count);
            }).then(() => {
                assert.equal(count, 5);
                done();
            }).catch((err) => {
                done(err);
            });
        });

        it('should exit an async iteration early when false is returned', (done) => {
            const list = new LinkedList<number>();
            list.push(1)
                .push(2)
                .push(3)
                .push(4)
                .push(5);

            let count = 0;
            list.forEachAsync(async (item) => {
                count++;
                return item !== 3;
            }).then(() => {
                assert.equal(count, 3, 'Should only have executed 3 times');
                done();
            }).catch((err) => {
                done(err);
            });
        });
    });

    describe('reduce', () => {
        it('should perform a synchronous reduce across all elements', () => {
            const list = new LinkedList<number>();
            list.push(1)
                .push(2)
                .push(3)
                .push(4)
                .push(5);

            const result: number = list.reduce((arg, val, index) => {
                assert.equal(index, arg - 1);
                return val += arg;
            }, 0);

            assert.equal(result, 15, 'Should have summed all the values');
        });

        it('should perform an asynchronous reduce across all elements', (done) => {
            const list = new LinkedList<number>();
            list.push(1)
                .push(2)
                .push(3)
                .push(4)
                .push(5);

            const result: Promise<number> = list.reduceAsync(async (arg, val, index) => {
                assert.equal(index, arg - 1);
                return Promise.resolve(val += arg);
            }, 0);

            result.then((finalResult) => {
                assert.equal(finalResult, 15, 'Should have summed all the values');
                done();
            }).catch((err) => {
                assert.fail(err);
                done(err);
            });
        });
    });

    describe('has', () => {
        it('checks for an item that is present', () => {
            const list = new LinkedList<number>();
            list.push(1)
                .push(2)
                .push(3)
                .push(4)
                .push(5);

            assert.isTrue(list.has(3, (item, arg) => {
                return item === arg;
            }));
        });

        it('should return false when an item is not present', () => {
            const list = new LinkedList<number>();
            list.push(1)
                .push(2)
                .push(3)
                .push(4)
                .push(5);

            assert.isFalse(list.has(6, (item, arg) => {
                return item === arg;
            }));
        });
    });

});