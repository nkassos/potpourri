export interface Graph {
    addNode(name: String)
    addEdge(from: String, to: String)
    getNodes(): Set<String>
    getRootNodes(): Set<String>
    getEdges(): Map<String, Set<String>>
}