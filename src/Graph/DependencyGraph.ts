import type { Graph } from './Graph';
import { LinkedStack } from '../Stack/LinkedStack';
import { GraphUtil } from './GraphUtil';


class DependencyGraph<T> implements Graph<T> {

    private readonly nodes: Set<T>;
    private readonly rootNodes: Set<T>;
    private readonly edges: Map<T, Set<T>>;

    constructor() {
        this.nodes = new Set();
        this.rootNodes = new Set();
        this.edges = new Map();
    }

    addNode(node: T) : DependencyGraph<T> {
        this.nodes.add(node);
        this.rootNodes.add(node);
        return this;
    }

    addEdge(from: T, to: T): DependencyGraph<T> {
        if(!this.nodes.has(from)) {
            throw new Error('Node ' + from + ' not found');
        }
        if(!this.nodes.has(to)) {
            throw new Error('Node ' + to + ' not found');
        }

        const nodes: Set<T> = this.edges.get(from) || new Set();
        if(!nodes.has(to)) {
            nodes.add(to);
            this.edges.set(from, nodes);
        }

        if(this.rootNodes.has(to)) {
            this.rootNodes.delete(to);
        }

        return this;
    }

    getNodes(): Set<T> {
        return this.nodes;
    }

    getRootNodes(): Set<T> {
        return this.rootNodes;
    }

    getEdges(): Map<T, Set<T>> {
        return this.edges;
    }

    getOrder(): IterableIterator<T> {
        const stack = new LinkedStack<T>();
        try {
            GraphUtil.depthFirstSearch(this, (node: T, visited: boolean): boolean => {
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
