import { DependencyGraph } from '../../src/Graph/DependencyGraph';
import { GraphUtil } from '../../dist/Graph/GraphUtil';
import { assert } from 'chai';

describe('DependencyGraph', () => {
    it('should create the correct order', () => {
        const g = new DependencyGraph();
        g.addNode('node-1');
        g.addNode('node-2');
        g.addNode('node-3');

        g.addEdge('node-1', 'node-3');
        g.addEdge('node-3', 'node-2');

        const order = g.getOrder();
        assert.ok(order);
        assert.equal(order.next().value, 'node-1');
        assert.equal(order.next().value, 'node-3');
        assert.equal(order.next().value, 'node-2');

        const next = order.next();
        assert.equal(next.value, undefined);
        assert.equal(next.done, true);
    });

    it('should detect a cycle', () => {
        const g = new DependencyGraph();
        g.addNode('node-1');
        g.addNode('node-2');
        g.addNode('node-3');

        g.addEdge('node-1', 'node-2');
        g.addEdge('node-2', 'node-3');
        g.addEdge('node-3', 'node-1');

        try {
            const order = g.getOrder();
            assert.fail('Should have thrown an error due to a cycle');
        } catch (e) {
            assert.equal(e.message, 'this is cyclic');
        }
    });

    it('should throw if from node not present', () => {
        const g = new DependencyGraph();
        g.addNode('to');
        try {
            g.addEdge('from', 'to');
            assert.fail('should have thrown for missing from node');
        } catch (e) {
            assert.equal(e.message, 'Node from not found');
        }
    });

    it('should throw if to node not present', () => {
        const g = new DependencyGraph();
        g.addNode('from');
        try {
            g.addEdge('from', 'to');
            assert.fail('should have thrown for missing to node');
        } catch (e) {
            assert.equal(e.message, 'Node to not found');
        }
    });

    it('should add a new node as a root node', () => {
        const g = new DependencyGraph();
        g.addNode('node');
        assert.isTrue(g.getRootNodes().has('node'));
    });

    it('should remove a node from root nodes when a dependency is added', () => {
        const g = new DependencyGraph();
        g.addNode('node-1');
        g.addNode('node-2');
        assert.equal(2, g.getRootNodes().size);
        assert.isTrue(g.getRootNodes().has('node-1'));
        assert.isTrue(g.getRootNodes().has('node-2'));

        g.addEdge('node-1', 'node-2');
        assert.equal(1, g.getRootNodes().size);
        assert.isTrue(g.getRootNodes().has('node-1'));
        assert.isFalse(g.getRootNodes().has('node-2'));
    });
});
