import type { Graph } from './Graph';
import { LinkedStack } from '../Stack/LinkedStack';
import { GraphUtil } from './GraphUtil';
import { PrimitiveLabel } from '../util/PrimitiveLabel';


class SimpleGraph implements Graph<PrimitiveLabel> {

    private readonly nodes: Set<PrimitiveLabel>;
    private readonly rootNodes: Set<PrimitiveLabel>;
    private readonly edges: Map<PrimitiveLabel, Set<PrimitiveLabel>>;

    constructor() {
        this.nodes = new Set();
        this.rootNodes = new Set();
        this.edges = new Map();
    }

    addNode(node: PrimitiveLabel) : Graph<PrimitiveLabel> {
        this.nodes.add(node);
        this.rootNodes.add(node);
        return this;
    }

    addEdge(from: PrimitiveLabel, to: PrimitiveLabel): Graph<PrimitiveLabel> {
        if(!this.nodes.has(from)) {
            throw new Error(`Node ${String(from)} not found`);
        }
        if(!this.nodes.has(to)) {
            throw new Error(`Node ${String(to)} not found`);
        }

        const nodes: Set<PrimitiveLabel> = this.edges.get(from) || new Set();
        if(!nodes.has(to)) {
            nodes.add(to);
            this.edges.set(from, nodes);
        }

        if(this.rootNodes.has(to)) {
            this.rootNodes.delete(to);
        }

        return this;
    }

    getNodes(): Set<PrimitiveLabel> {
        return this.nodes;
    }

    getRootNodes(): Set<PrimitiveLabel> {
        return this.rootNodes;
    }

    getEdges(): Map<PrimitiveLabel, Set<PrimitiveLabel>> {
        return this.edges;
    }
}

export { SimpleGraph };
