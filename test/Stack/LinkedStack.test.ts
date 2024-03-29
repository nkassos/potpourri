import { LinkedStack } from '../../src';
import { testStack, TestStackGenerator } from './Stack.test';

describe('LinkedStack', () => {
    const stackContructor: TestStackGenerator = <T> (comparator) => {
        return new LinkedStack<T>(comparator);
    };

    testStack(stackContructor);
});