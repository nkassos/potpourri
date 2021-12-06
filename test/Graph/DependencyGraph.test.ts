import { SimpleGraph } from '../../src/Graph/SimpleGraph';
import { depthFirstSearch } from '../../src/Graph/depthFirstSearch';
import { assert } from 'chai';

describe('SimpleGraph', () => {
    it('should detect a cycle', () => {
        const g = new SimpleGraph();
        g.addNode('node-1');
        g.addNode('node-2');
        g.addNode('node-3');

        g.addEdge('node-1', 'node-2');
        g.addEdge('node-2', 'node-3');
        g.addEdge('node-3', 'node-1');

        try {
            depthFirstSearch(g, (node, visited) => true);
            assert.fail('Should have thrown an error due to a cycle');
        } catch (e) {
            assert.equal(e.message, 'Cycle Detected');
            assert.deepEqual(e.cycle, [
                'node-3',
                'node-2',
                'node-1'
            ]);
        }
    });

    it('should throw if from node not present', () => {
        const g = new SimpleGraph();
        g.addNode('to');
        try {
            g.addEdge('from', 'to');
            assert.fail('should have thrown for missing from node');
        } catch (e) {
            assert.equal(e.message, 'Node from not found');
        }
    });

    it('should throw if to node not present', () => {
        const g = new SimpleGraph();
        g.addNode('from');
        try {
            g.addEdge('from', 'to');
            assert.fail('should have thrown for missing to node');
        } catch (e) {
            assert.equal(e.message, 'Node to not found');
        }
    });

    it('should add a new node as a root node', () => {
        const g = new SimpleGraph();
        g.addNode('node');
        assert.isTrue(g.getRootNodes().has('node'));
    });

    it('should remove a node from root nodes when a dependency is added', () => {
        const g = new SimpleGraph();
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
