import type { Graph } from './Graph';
import { LinkedStack } from '../Stack/LinkedStack';
import { GraphUtil } from './GraphUtil';


class StringGraph implements Graph<string> {

    private readonly nodes: Set<string>;
    private readonly rootNodes: Set<string>;
    private readonly edges: Map<string, Set<string>>;

    constructor() {
        this.nodes = new Set();
        this.rootNodes = new Set();
        this.edges = new Map();
    }

    addNode(node: string) : Graph<string> {
        this.nodes.add(node);
        this.rootNodes.add(node);
        return this;
    }

    addEdge(from: string, to: string): Graph<string> {
        if(!this.nodes.has(from)) {
            throw new Error('Node ' + from + ' not found');
        }
        if(!this.nodes.has(to)) {
            throw new Error('Node ' + to + ' not found');
        }

        const nodes: Set<string> = this.edges.get(from) || new Set();
        if(!nodes.has(to)) {
            nodes.add(to);
            this.edges.set(from, nodes);
        }

        if(this.rootNodes.has(to)) {
            this.rootNodes.delete(to);
        }

        return this;
    }

    getNodes(): Set<string> {
        return this.nodes;
    }

    getRootNodes(): Set<string> {
        return this.rootNodes;
    }

    getEdges(): Map<string, Set<string>> {
        return this.edges;
    }

}

export { StringGraph };
