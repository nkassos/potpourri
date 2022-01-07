import { ArrayStack } from '../../src/Stack/ArrayStack';
import { testStack, TestStackGenerator } from './Stack.test';

describe('ArrayStack', () => {
    const stackContructor: TestStackGenerator = <T> (comparator) => {
        return new ArrayStack<T>(comparator);
    };

    testStack(stackContructor);
});