import type { Graph } from './Graph';
import type { Stack } from '../Stack/Stack';
import { LinkedStack } from "../Stack/LinkedStack";

function visit(node: string, visited: Set<string>, stack: Stack<string>, edges: Map<string, Set<string>>, callback: (this: void, node: string, visited: boolean) => boolean) {
    if(!visited.has(node)) {
        if(stack.has(node)) {
            let cycle = new LinkedStack<string>();
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
    depthFirstSearch(graph: Graph, callback?: (this: void, node: string, visited: boolean) => boolean) {
        const visited = new Set<string>();
        const stack = new LinkedStack<string>();
        graph.getNodes().forEach((node) => {
            let result = visit(node, visited, stack, graph.getEdges(), callback);
        });
    },

    createEdgesToSet(edgesFrom: Map<string, Set<string>>): Map<string, Set<string>> {
        let edgesTo = new Map<string, Set<string>>();
        edgesFrom.forEach((value, key) => {
            value.forEach((edgeTo) => {
                let edgesToSet: Set<string> = edgesTo.get(edgeTo) || new Set();
                edgesToSet.add(key);
                edgesTo.set(edgeTo, edgesToSet);
            });
        });
        return edgesTo;
    }
};

export { GraphUtil };
