import { LinkedStack } from '../Stack/LinkedStack';
import { GraphUtil } from './GraphUtil';
import type { NodeValue } from './types';


class DependencyGraph {

    private readonly nodes: Set<NodeValue>;
    private readonly rootNodes: Set<NodeValue>;
    private readonly edges: Map<NodeValue, Set<NodeValue>>;

    constructor() {
        this.nodes = new Set();
        this.rootNodes = new Set();
        this.edges = new Map();
    }

    addNode(node: string) : DependencyGraph {
        this.nodes.add(node);
        this.rootNodes.add(node);
        return this;
    }

    addEdge(from: string, to: string): DependencyGraph {
        if(!this.nodes.has(from)) {
            throw new Error('Node ' + from + ' not found');
        }
        if(!this.nodes.has(to)) {
            throw new Error('Node ' + to + ' not found');
        }

        const nodes: Set<NodeValue> = this.edges.get(from) || new Set();
        if(!nodes.has(to)) {
            nodes.add(to);
            this.edges.set(from, nodes);
        }

        if(this.rootNodes.has(to)) {
            this.rootNodes.delete(to);
        }

        return this;
    }

    getNodes(): Set<NodeValue> {
        return this.nodes;
    }

    getRootNodes(): Set<NodeValue> {
        return this.rootNodes;
    }

    getEdges(): Map<NodeValue, Set<NodeValue>> {
        return this.edges;
    }

    getOrder(): IterableIterator<NodeValue> {
        const stack = new LinkedStack<NodeValue>();
        try {
            GraphUtil.depthFirstSearch(this, (node: NodeValue, visited: boolean): boolean => {
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
}

export { DependencyGraph };
