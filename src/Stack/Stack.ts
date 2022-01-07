import { LimitedAccessCollection } from '../LimitedAccessCollection';
import { Comparator, defaultComparator } from '../util/Comparator';

export abstract class Stack<T> implements LimitedAccessCollection<T> {

    protected readonly comparator: Comparator<T>;

    constructor(comparator?: Comparator<T>) {
        this.comparator = comparator || defaultComparator;
    }

    abstract has(item: Partial<T>): boolean;
    abstract has(item: Partial<T>, comparator: Comparator<T>): boolean;
    abstract peek(): T;
    abstract pop(): T;
    abstract push(item: T);
    abstract size(): number;

    *iterator(): IterableIterator<T> {
        while(this.size()) {
            yield this.pop();
        }
    }

    *[Symbol.iterator](): IterableIterator<T> {
        return this.iterator();
    }
}