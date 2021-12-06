import { assert } from 'chai';
import { LinkedCircularBuffer } from '../../src/buffer/LinkedCircularBuffer';

describe('LinkedCircularBuffer', () => {
    it('should store the most recent 5 elements', () => {
        const buf = new LinkedCircularBuffer(5);
        for(let i = 0 ; i < 10 ; ++i) {
            buf.push(i);
        }

        for(let i = 5 ; i < 10 ; ++i) {
            assert.equal(buf.pop(), i);
        }
    });

    describe('pop', () => {
        it('should return the first element and remove it', () => {
            const buf = new LinkedCircularBuffer(5);
            for(let i = 0 ; i < 5 ; ++i) {
                buf.push(i);
            }

            assert.equal(buf.getSize(), 5);
            assert.equal(buf.pop(), 0);
            assert.equal(buf.getSize(), 4);
        });
    });

    describe('peek', () => {
        it('should return the first element without removing it', () => {
            const buf = new LinkedCircularBuffer(5);
            for(let i = 0 ; i < 5 ; ++i) {
                buf.push(i);
            }

            assert.equal(buf.getSize(), 5);
            assert.equal(buf.peek(), 0);
            assert.equal(buf.getSize(), 5);
        });
    });

    it('should run a function for each element', () => {
        const buf = new LinkedCircularBuffer(5);
        for(let i = 0 ; i < 10 ; ++i) {
            buf.push(i);
        }

        let val = 5;
        buf.forEach((item) => {
            assert.equal(item, val++);
        });

        assert.equal(val, 10);
    });

    it('should reduce', () => {
        const buf = new LinkedCircularBuffer<number>(5);
        for(let i = 0 ; i < 10 ; ++i) {
            buf.push(i);
        }

        const sum = buf.reduce((item, accumulator) => {
            return accumulator + item;
        }, 0);

        assert.equal(sum, 5 + 6 + 7 + 8 + 9);
    });
});