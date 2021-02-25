import type { Graph } from './Graph';
import type { Stack } from '../Stack/Stack';
import { LinkedStack } from "../Stack/LinkedStack";

function visit(node: String, visited: Set<String>, stack: Stack<String>, edges: Map<String, Set<String>>, callback: (this: void, node: String, visited: boolean) => boolean) {
    if(!visited.has(node)) {
        if(stack.has(node)) {
            let cycle = new LinkedStack<String>();
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
        let result = callback(node, false);
        if (result) {
            if(edges.has(node)) {
                let edge = edges.get(node);
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
    depthFirstSearch(graph: Graph, callback?: (this: void, node: String, visited: boolean) => boolean) {
        const visited = new Set<String>();
        const stack = new LinkedStack<String>();
        graph.getNodes().forEach((node) => {
            let result = visit(node, visited, stack, graph.getEdges(), callback);
        });
    },

    createEdgesToSet(edgesFrom: Map<String, Set<String>>): Map<String, Set<String>> {
        let edgesTo = new Map<String, Set<String>>();
        edgesFrom.forEach((value, key) => {
            value.forEach((edgeTo) => {
                let edgesToSet: Set<String> = edgesTo.get(edgeTo) || new Set();
                edgesToSet.add(key);
                edgesTo.set(edgeTo, edgesToSet);
            });
        });
        return edgesTo;
    }
};

export { GraphUtil };
