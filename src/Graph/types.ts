export type NodeValue = string | symbol;

export interface NodeVistedCallback {
    (this: void, node: NodeValue, visited: boolean): boolean
}