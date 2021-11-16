export class CyclicalGraphError<T> extends Error {
    cycle: T[]

    constructor(cycle: T[]) {
        super('Cycle Detected');
        this.cycle = cycle;
    }
}