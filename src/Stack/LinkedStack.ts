import {Stack} from "./Stack";
import {LinkedList} from "../List/LinkedList";

/**
 * A Stack implementation based on a linked list
 * Can grow to indefinite size
 * Push and Pop operations occur in constant time
 */
export class LinkedStack<T> implements Stack<T> {

    readonly #list: LinkedList<T>;
    private readonly defaultComparator = (item: T, arg: T): boolean => item === arg;

    constructor() {
        this.#list = new LinkedList<T>();
    }

    pop(): T {
        return this.#list.pop();
    }

    push(item: T) {
        this.#list.push(item);
    }

    has(arg: T, comparator: (item: T, arg?: T) => boolean = this.defaultComparator): boolean {
        return this.#list.has(arg, comparator);
    }

    size(): number {
        return this.#list.size();
    }

    *iterator(): IterableIterator<T> {
        while(this.size()) {
            yield this.pop();
        }
    }

}