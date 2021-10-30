export interface Graph<T> {
    addNode(node: T)
    addEdge(from: T, to: T)
    getNodes(): Set<T>
    getRootNodes(): Set<T>
    getEdges(): Map<T, Set<T>>
}