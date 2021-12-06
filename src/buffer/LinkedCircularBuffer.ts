import { LinkedList } from '../List/LinkedList';

export class LinkedCircularBuffer<T> {

    private readonly buffer: LinkedList<T>;
    private maxSize: number;


    constructor(size: number) {
        this.buffer = new LinkedList<T>();
        this.maxSize = size;
    }

    getSize(): number {
        return this.buffer.size();
    }

    push(item: T): T {
        this.buffer.push(item);
        if(this.buffer.size() > this.maxSize) {
            return this.buffer.unshift();
        }

        return undefined;
    }

    pop(): T {
        return this.buffer.unshift();
    }

    peek(): T {
        return this.buffer.get(0);
    }

    forEach(fn: (item: T) => void): void {
        this.buffer.forEach(fn);
    }

    reduce<U>(fn: (arg: T, value: U, index?: number) => U, initialValue?: U): U {
        return this.buffer.reduce(fn, initialValue);
    }


}