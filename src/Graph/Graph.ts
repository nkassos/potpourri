export interface Graph {
    addNode(name: string)
    addEdge(from: string, to: string)
    getNodes(): Set<string>
    getRootNodes(): Set<string>
    getEdges(): Map<string, Set<string>>
}