import { Stack } from "./Stack";
import { LinkedList } from "../List/LinkedList";
import type { Comparator } from '../util/Comparator';

/**
 * A Stack implementation based on a linked list
 * Can grow to indefinite size
 * Push and Pop operations occur in constant time
 */
export class LinkedStack<T> extends Stack<T> {

    readonly #list: LinkedList<T>;

    constructor(comparator?: Comparator<T>) {
        super(comparator);
        this.#list = new LinkedList<T>();
    }

    pop(): T {
        return this.#list.pop();
    }

    peek(): T {
        return this.#list.get(this.#list.size() - 1);
    }

    push(item: T) {
        this.#list.push(item);
    }

    has(arg: Partial<T>): boolean
    has(arg: Partial<T>, comparator: Comparator<T>): boolean
    has(arg: Partial<T>, comparator?: Comparator<T>): boolean {
        const localComparator = comparator || this.comparator;
        return this.#list.has(arg, localComparator);
    }

    size(): number {
        return this.#list.size();
    }

}