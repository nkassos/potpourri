import {Collection} from "../Collection";

export interface List<T> extends Collection<T> {
    /**
     * Adds an item to the end of the list
     * @param item
     * @return the list instance
     */
    push(item: T): this;

    /**
     * Returns the item at the end of the list, and removes it from the list
     */
    pop(): T;

    /**
     * Adds an item to the beginning of the list and returns the list instance
     * @param item
     * @return the list instance
     */
    shift(item: T): this;

    /**
     * Returns the item at the beginning of the list, and removes it from the list
     */
    unshift(): T;

    /**
     * Returns the item at the specified location
     * @param index
     */
    get(index: number): T;

    /**
     * Adds an item to the list at the specified index and returns the list instance
     * @param index
     * @param item
     * @return the list instance
     */
    add(index: number, item: T): this;
}