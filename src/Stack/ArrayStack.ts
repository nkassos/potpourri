import { Stack } from './Stack';
import type { Comparator } from '../util/Comparator';

export class ArrayStack<T> extends Stack<T> {

    private readonly collection: T[];

    constructor(comparator?: Comparator<T>) {
        super(comparator);
        this.collection = [];
    }

    has(arg: Partial<T>): boolean
    has(arg: Partial<T>, comparator: Comparator<T>): boolean
    has(arg: Partial<T>, comparator?: Comparator<T>): boolean {
        const predicate = comparator || this.comparator;
        return this.collection.findIndex(value => predicate(value, arg)) > -1;
    }

    peek(): T {
        return this.collection.at(-1);
    }

    pop(): T {
        return this.collection.pop();
    }

    push(item: T) {
        this.collection.push(item);
    }

    size(): number {
        return this.collection.length;
    }

}