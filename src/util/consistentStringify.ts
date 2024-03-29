function handleValueByType(value: any) {
    if(Array.isArray(value)) {
        return orderArrayObjects(value);
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
        return orderObjectKeys(value);
    }

    return value;
}

function orderArrayObjects(arr: any[]) {
    return arr.map(value => {
        return handleValueByType(value);
    });
}
function orderObjectKeys(obj: object) {
    return Object.keys(obj)
        .sort()
        .map(key => {
            const value = obj[key];
            return {
                [key]: handleValueByType(value)
            };
        }).reduce((prev, cur) => {
            return Object.assign(prev, cur);
        }, {});
}
export function consistentStringify(obj: object) {
    return JSON.stringify(handleValueByType(obj));
}