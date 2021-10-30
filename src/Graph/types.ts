export interface NodeVistedCallback<T> {
    (this: void, node: T, visited: boolean): boolean
}