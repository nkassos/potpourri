import { hashCode } from '../util/hashCode';
import { consistentStringify } from '../util/consistentStringify';

export interface HashFunction<T> {
    (obj: T): number
}

export const defaultHashFunction: HashFunction<any> = (obj: any) => {
    return hashCode(consistentStringify(obj));
}

export class HashMap<T, U> implements Map<T, U> {

    private readonly hashFunction;
    private readonly keyMap: Map<string, T>;
    private readonly valueMap: Map<string, U>;

    readonly [Symbol.toStringTag]: string = '[object Map]';

    constructor(hashFunction?: HashFunction<T>) {
        this.hashFunction = hashFunction ? hashFunction : defaultHashFunction;
        this.keyMap = new Map<string, T>();
        this.valueMap = new Map<string, U>();
    }

    has(key: T): boolean {
        const hash = this.hashFunction(key);
        return this.keyMap.has(hash);
    }

    set(key: T, value: U): this {
        const hash = this.hashFunction(key);
        this.keyMap.set(hash, key);
        this.valueMap.set(hash, value);
        return this;
    }

    get(key: T): U | undefined {
        const hash = this.hashFunction(key);
        if(this.keyMap.has(hash)) {
            return this.valueMap.get(hash);
        }

        return undefined;
    }

    delete(key: T): boolean {
        const hash = this.hashFunction(key);
        if(this.keyMap.has(hash)) {
            this.keyMap.delete(hash);
            this.valueMap.delete(hash);
            return true;
        }

        return false;
    }

    clear(): void {
        this.keyMap.clear();
        this.valueMap.clear();
    }

    keys(): IterableIterator<T> {
        return this.keyMap.values();
    }

    values(): IterableIterator<U> {
        return this.valueMap.values();
    }

    forEach(callbackfn: (value: U, key: T, map: Map<T, U>) => void, thisArg?: any): void {
        this.keyMap.forEach((keyValue, hash) => {
            callbackfn.call(thisArg, this.valueMap.get(hash), keyValue, this);
        });
    }

    get size(): number {
        return this.keyMap.size;
    }

    *entries(): IterableIterator<[T, U]> {
        const keys = this.keyMap.keys();
        for(let key of keys) {
            yield [
                this.keyMap.get(key),
                this.valueMap.get(key)
            ]
        }
    }

    [Symbol.iterator](): IterableIterator<[T, U]> {
        return this.entries();
    }

}