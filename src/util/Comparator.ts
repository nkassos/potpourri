export interface Comparator<T> {
    (item: T, arg: Partial<T>): boolean
}

export interface RankedComparator<T> {
    (item: T, arg: T): number
}

const defaultComparator: Comparator<any> = (item: any, arg: any): boolean => {
    return item === arg;
};

export { defaultComparator };