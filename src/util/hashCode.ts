interface HashFunction<T> {
    (obj: T): number
}

/**
 * This function is an implementation of Java's hashCode function copy-pasted from the internet
 * @param val A string to be hashed
 */
const hashCode: HashFunction<string> = (val: string): number => {
    let hash = 0;
    if(val.length == 0) return hash;
    for(let i = 0 ; i < val.length ; ++i) {
        const ch = val.charCodeAt(i);
        hash = ((hash << 5) - hash) + ch;
        hash = hash & hash;
    }

    return hash;
};

export {
    HashFunction,
    hashCode
};