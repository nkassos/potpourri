import { Comparator } from './util/Comparator';

export interface LimitedAccessCollection<T> {

    /**
     * Adds the item to the collection tail
     */
    push(item: T)

    /**
     * Returns the item from the collection head and removes it
     */
    pop(): T

    /**
     * Returns the item from the collection head without removal
     */
    peek(): T

    /**
     * Returns an iterator
     */
    iterator(): IterableIterator<T>
    [Symbol.iterator](): IterableIterator<T>

    /**
     * Returns true if the stack contains the specified item
     * Optionally takes a function to perform the comparison
     */
    has(item: Partial<T>)
    has(item: Partial<T>, comparator: Comparator<T>): boolean

    /**
     * returns the number of elements in the stack
     */
    size(): number
}