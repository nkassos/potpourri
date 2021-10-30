import type { Graph } from './Graph';
import type { Stack } from '../Stack/Stack';
import { LinkedStack } from "../Stack/LinkedStack";
import type { NodeValue, NodeVistedCallback } from './types';

function visit(node: NodeValue, visited: Set<NodeValue>, stack: Stack<NodeValue>, edges: Map<NodeValue, Set<NodeValue>>, callback: NodeVistedCallback) {
    if(!visited.has(node)) {
        if(stack.has(node)) {
            const cycle = new LinkedStack<string | symbol>();
            cycle.push(node);
            let next = stack.pop();
            while(next != node) {
                cycle.push(next);
                next = stack.pop();
            }
            cycle.push(next);
            throw cycle;
        }

        stack.push(node);
        const result = callback(node, false);
        if (result) {
            if(edges.has(node)) {
                const edge = edges.get(node);
                edge.forEach((toNode) => {
                    visit(toNode, visited, stack, edges, callback);
                });
            }
            visited.add(node);
        }
        stack.pop();
        callback(node, true);
    }
}

const GraphUtil = {
    // throws for a cycle
    depthFirstSearch(graph: Graph, callback?: NodeVistedCallback) {
        const visited = new Set<NodeValue>();
        const stack = new LinkedStack<NodeValue>();
        graph.getNodes().forEach((node) => {
            const result = visit(node, visited, stack, graph.getEdges(), callback);
        });
    },

    createEdgesToSet(edgesFrom: Map<string, Set<string>>): Map<string, Set<string>> {
        const edgesTo = new Map<string, Set<string>>();
        edgesFrom.forEach((value, key) => {
            value.forEach((edgeTo) => {
                const edgesToSet: Set<string> = edgesTo.get(edgeTo) || new Set();
                edgesToSet.add(key);
                edgesTo.set(edgeTo, edgesToSet);
            });
        });
        return edgesTo;
    }
};

export { GraphUtil };
