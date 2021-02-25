import {LinkedStack} from "../Stack/LinkedStack";
import { GraphUtil } from "./GraphUtil";


class DependencyGraph {

    private readonly nodes: Set<String>;
    private readonly rootNodes: Set<String>;
    private readonly edges: Map<String, Set<String>>;

    constructor() {
        this.nodes = new Set();
        this.rootNodes = new Set();
        this.edges = new Map();
    }

    addNode(node: String) : DependencyGraph {
        this.nodes.add(node);
        this.rootNodes.add(node);
        return this;
    }

    addEdge(from: String, to: String): DependencyGraph {
        if(!this.nodes.has(from)) {
            throw new Error('Node ' + from + ' not found');
        }
        if(!this.nodes.has(to)) {
            throw new Error('Node ' + to + ' not found');
        }

        let nodes: Set<String> = this.edges.get(from) || new Set();
        if(!nodes.has(to)) {
            nodes.add(to);
            this.edges.set(from, nodes);
        }

        if(this.rootNodes.has(to)) {
            this.rootNodes.delete(to);
        }

        return this;
    }

    getNodes(): Set<String> {
        return this.nodes;
    }

    getRootNodes(): Set<String> {
        return this.rootNodes;
    }

    getEdges(): Map<String, Set<String>> {
        return this.edges;
    }

    getOrder(): IterableIterator<String> {
        const stack = new LinkedStack<String>();
        try {
            GraphUtil.depthFirstSearch(this, (node: String, visited: boolean): boolean => {
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
