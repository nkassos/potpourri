import { hashCode, HashFunction } from '../util/hashCode';
import { consistentStringify } from '../util/consistentStringify';

export const defaultHashFunction: HashFunction<any> = (obj: any): number => {
    return hashCode(consistentStringify(obj));
}

interface MapItem<T, U> {
    key: T;
    value: U;
}

export class HashMap<T, U> implements Map<T, U> {

    private readonly hashFunction: HashFunction<T>;
    private readonly map: Map<number, MapItem<T, U>>;

    readonly [Symbol.toStringTag]: string = 'Map';

    constructor(hashFunction?: HashFunction<T>) {
        this.hashFunction = hashFunction ? hashFunction : defaultHashFunction;
        this.map = new Map<number, MapItem<T, U>>();
    }

    has(key: T): boolean {
        const hash = this.hashFunction(key);
        return this.map.has(hash);
    }

    set(key: T, value: U): this {
        const hash = this.hashFunction(key);
        this.map.set(hash, {
            key,
            value
        });
        return this;
    }

    get(key: T): U | undefined {
        const hash = this.hashFunction(key);
        return this.map.get(hash)?.value;
    }

    delete(key: T): boolean {
        const hash = this.hashFunction(key);
        return this.map.delete(hash);
    }

    clear(): void {
        this.map.clear();
    }

    *keys(): IterableIterator<T> {
        for(let item of this.map.values()) {
            yield item.key;
        }
    }

    *values(): IterableIterator<U> {
        for(let item of this.map.values()) {
            yield item.value;
        }
    }

    forEach(callbackfn: (value: U, key: T, map: Map<T, U>) => void, thisArg?: any): void {
        this.map.forEach((item, hash) => {
            callbackfn.call(thisArg, item.value, item.key, this);
        });
    }

    get size(): number {
        return this.map.size;
    }

    *entries(): IterableIterator<[T, U]> {
        for(let item of this.map.values()) {
            yield [
                item.key,
                item.value
            ];
        }
    }

    [Symbol.iterator](): IterableIterator<[T, U]> {
        return this.entries();
    }

}