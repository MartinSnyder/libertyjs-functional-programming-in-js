// Condition types
export const ALL = 'All'; // no data
export const EQUALS = 'Equals'; // { attr: 'Attribute Name', value: 'Attribute Value' }

export class Condition {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
}

function greedyPredicate() { return true; }

export function toPredicate(condition) {
    if (!condition)
        return greedyPredicate;

    switch (condition.type) {
        case ALL:
            return greedyPredicate;

        case EQUALS:
            return function(record) {
                const attrValue = record[condition.data.attr];

                return (attrValue === condition.data.value);
            };

        default:
            throw Error(`Bummer: ${condition.type}`);
    }




    // throw new Error('Implement this function as part of Exercise 1');
}
