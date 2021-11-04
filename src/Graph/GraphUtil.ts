import type { Graph } from './Graph';
import type { Stack } from '../Stack/Stack';
import { LinkedStack } from "../Stack/LinkedStack";
import type { NodeVistedCallback } from './types';

function visit<T>(node: T, visited: Set<T>, stack: Stack<T>, edges: Map<T, Set<T>>, callback: NodeVistedCallback<T>) {
    if(!visited.has(node)) {
        if(stack.has(node)) {
            // detects a cycle
            // push the relevant nodes onto a stack and throw
            const cycle = new LinkedStack<T>();
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
    depthFirstSearch<T>(graph: Graph<T>, callback?: NodeVistedCallback<T>) {
        const visited = new Set<T>();
        const stack = new LinkedStack<T>();
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
    },

    *getCanonicalOrder<T>(graph: Graph<T>): IterableIterator<T> {
        const stack = new LinkedStack<T>();
        try {
            GraphUtil.depthFirstSearch<T>(graph, (node: T, visited: boolean): boolean => {
                if (visited) {
                    stack.push(node);
                }
                return true;
            });
        } catch (err) {
            throw new Error('this is cyclic');
        }
        return stack.iterator();
    }
};

export { GraphUtil };
