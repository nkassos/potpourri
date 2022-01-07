import { List } from './List';
import { Comparator, defaultComparator } from '../util/Comparator';

interface ListItem<T> {
    data: T;
    prev: ListItem<T>;
    next: ListItem<T>;
}

export class LinkedList<T> implements List<T> {

    #collectionStart: ListItem<T>;
    #collectionEnd: ListItem<T>;
    #size: number;
    #comparator: Comparator<T>;

    constructor(comparator?: Comparator<T>) {
        this.#collectionStart = null;
        this.#collectionEnd = null;
        this.#size = 0;
        this.#comparator = comparator || defaultComparator;
    }

    forEach(fn: (item: T, index?: number) => any): void {
        for(let cur = this.#collectionStart, index = 0 ; cur != null ; cur = cur.next) {
            if(fn(cur.data, index++) === false) break;
        }
    }

    async forEachAsync(fn: (item: T) => Promise<any>): Promise<void> {
        let cur = this.#collectionStart;
        while(cur != null) {
            if(await fn(cur.data) === false) break;
            cur = cur.next;
        }
    }

    has(arg: Partial<T>, comparator?: Comparator<T>): boolean {
        const localComparator = comparator || this.#comparator;
        let found = false;
        this.forEach((item) => {
            found = !!localComparator(item, arg);
            return !found;
        });

        return found;
    }

    toArray(): Array<T>;
    toArray<U>(fn: (arg: T) => U): Array<U>;
    toArray(fn?): any {
    }

    unshift(): T {
        if(this.#size) {
            const node = this.#collectionStart;
            this.#collectionStart = node.next;
            this.#size -= 1;
            return node.data;
        }

        return undefined;
    }

    size(): number {
        return this.#size;
    }

    each(fn: (arg: T, index?: number) => void): LinkedList<T> {
        let cur = this.#collectionStart;
        let index = 0;
        while(cur != null) {
            fn(cur.data, index);
            cur = cur.next;
            ++index;
        }

        return this;
    }

    *iterator(): IterableIterator<T> {
        let cur = this.#collectionStart;
        while(cur != null) {
            yield cur.data;
            cur = cur.next;
        }
    }

    iteratorAsync(): AsyncIterableIterator<T> {
        return undefined;
    }

    private goToIndex(index: number): ListItem<T> {
        if(index >= 0 && index < this.#size) {
            let cur = this.#collectionStart;
            for(let curIndex = 0 ; curIndex < index ; ++curIndex) {
                cur = cur.next;
            }

            return cur;
        } else {
            return null;
        }
    }

    get(index: number): T {
        return this.goToIndex(index)?.data;
    }

    add(index: number, item: T): this {
        if(index < 0 || index > this.#size) {
            throw new Error('Index out of bounds');
        }

        if(index == this.#size) {
            this.#collectionEnd.next = {
                data: item,
                prev: this.#collectionEnd,
                next: null
            }

            this.#collectionEnd = this.#collectionEnd.next;
        } else {
            const temp = this.goToIndex(index);
            const itemWrapper = {
                data: item,
                prev: temp.prev,
                next: temp
            };

            itemWrapper.prev.next = itemWrapper;
            itemWrapper.next.prev = itemWrapper;
        }

        return this;
    }

    push(item: T): this {
        const node = {
            data: item,
            prev: null,
            next: null
        };

        if(this.#size) {
            node.prev = this.#collectionEnd;
            this.#collectionEnd.next = node;
        } else {
            this.#collectionStart = node;
        }

        this.#collectionEnd = node;
        ++this.#size;

        return this;
    }

    pop(): T {
        if(this.#size) {
            const node = this.#collectionEnd;
            this.#collectionEnd = node.prev;
            this.#size -= 1;
            return node.data;
        }

        return undefined;
    }

    shift(item: T): this {
        const node = {
            data: item,
            prev: null,
            next: null
        };

        if(this.#size) {
            node.next = this.#collectionStart;
        } else {
            this.#collectionEnd = node;
        }

        this.#collectionStart = node;
        ++this.#size;

        return this;
    }

    reduce<U>(fn: (arg: T, value: U, index?: number) => U, initialValue?: U): U {
        let cur = this.#collectionStart;
        let curIndex = 0;
        let curResult: U = initialValue === undefined ? null : initialValue;
        this.forEach((item, index) => {
            curResult = fn(item, curResult, index);
        });

        return curResult;
    }

    async reduceAsync<U>(fn: (arg: T, value: U, index?: number) => Promise<U>, initialValue?: U): Promise<U> {
        let cur = this.#collectionStart;
        let curIndex = 0;
        let curResult = initialValue === undefined ? null : initialValue;
        while(cur != null) {
            curResult = await fn(cur.data, curResult, curIndex);
            curIndex++;
            cur = cur.next;
        }

        return curResult;
    }

}
