export function hashCode(val: string) {
    let hash = 0;
    if(val.length == 0) return hash;
    for(let i = 0 ; i < val.length ; ++i) {
        const ch = val.charCodeAt(i);
        hash = ((hash << 5) - hash) + ch;
        hash = hash & hash;
    }

    return hash;
}