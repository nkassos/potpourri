import { Stack } from '../Stack/Stack';
import { NodeVistedCallback } from './types';
import { CyclicalGraphError } from './CyclicalGraphError';
import { Graph } from './Graph';
import { ArrayStack } from '../Stack/ArrayStack';

function visit<T>(node: T, visited: Set<T>, stack: Stack<T>, edges: Map<T, Set<T>>, callback: NodeVistedCallback<T>) {
    if(!visited.has(node)) {
        if(stack.has(node)) {
            // detects a cycle
            // push the relevant nodes onto a stack and throw
            const cycle: T[] = [];
            let next = stack.pop();
            while(next != node) {
                cycle.push(next);
                next = stack.pop();
            }
            cycle.push(next);
            throw new CyclicalGraphError(cycle);
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

export function depthFirstSearch<T>(graph: Graph<T>, callback: NodeVistedCallback<T>) {
    const visited = new Set<T>();
    const stack = new ArrayStack<T>();
    graph.getNodes().forEach((node) => {
        const result = visit(node, visited, stack, graph.getEdges(), callback);
    });
}