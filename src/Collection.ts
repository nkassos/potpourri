import { Comparator } from './util/Comparator';

export interface Collection<T> {

    /**
     * Returns the number of elements in this collection
     */
    size(): number;

    /**
     * Returns boolean true or false depending on whether the specified item exists in this collection.
     * If a comparator function is specified, it will override the implementation comparator if one was provided.
     * If a comparator is not specified, it will use the comparator provided to the implementation at creation.
     * If no comparator is specified, the default naive comparator will be used.
     *
     * @param arg
     * @param comparator
     */
    has(arg: Partial<T>, comparator?: Comparator<T>): boolean;

    /**
     * Returns the elements of this collection in an array.
     * The order of elements is not necessarily deterministic, and is dependent on each collection
     *
     * Optionally takes a transformation function that returns an array of the new element type
     */
    toArray(): Array<T>;
    toArray<U>(fn: (arg: T) => U): Array<U>;

    /**
     * Executes the provided function for each element in this collection.
     * The order of elements is not necessarily deterministic, and is dependent on each collection.
     * Execution can be halted early by explicitly returning false
     *
     * @param fn The function to execute for each element
     */
    forEach(fn: (item: T) => any): void;
    forEachAsync(fn: (item: T) => Promise<any>): Promise<void>;

    /**
     * Executes the provided function on each element in the collection, and passes the result to the next execution.
     * The value passed to the first execution is null.
     * The order of elements is not necessarily deterministic, and is dependent on each collection.
     * The final value from the provided function is returned.
     *
     * @param fn The function to execute on each element
     */
    reduce<U>(fn: (arg: T, value: U | null, index?: number) => U, initialValue?: U): U;
    reduceAsync<U>(fn: (arg: T, value: U | null, index?: number) => Promise<U>, initialValue?: U): Promise<U>;

    /**
     * Creates an iterator for the elements in this collection.
     * The order of elements is not necessarily deterministic, and is dependent on each collection.
     */

    iterator(): IterableIterator<T>;

    /**
     * Creates an async iterator for the elements in this collection.
     * The order of elements is not necessarily deterministic, and is dependent on each collection.
     */
    iteratorAsync(): AsyncIterableIterator<T>;
}