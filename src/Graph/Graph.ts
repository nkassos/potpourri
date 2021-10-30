import type { NodeValue } from './types';

export interface Graph {
    addNode(name: NodeValue)
    addEdge(from: NodeValue, to: NodeValue)
    getNodes(): Set<NodeValue>
    getRootNodes(): Set<NodeValue>
    getEdges(): Map<NodeValue, Set<NodeValue>>
}