export interface Stack<T> {

    /**
     * Adds the item to the end of the collection
     */
    push(item: T)

    /**
     * Returns the most recently added item and removed it from the collection
     */
    pop(): T

    /**
     * Returns true if the stack contains the specified item
     * Optionally takes a function to perform the comparison
     */
    has(item: T, comparator?: (actual: T, expected: T) => boolean): boolean

    /**
     * returns the number of elements in the stack
     */
    size(): number

    /**
     * Returns an iterator
     */
    iterator(): IterableIterator<T>
}