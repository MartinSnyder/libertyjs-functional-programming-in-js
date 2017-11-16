// Condition types
export const ALL = 'All'; // no data
export const EQUALS = 'Equals'; // { attr: 'Attribute Name', value: 'Attribute Value' }

export class Condition {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
}

export function toPredicate(condition) {
    throw new Error('Implement this function as part of Exercise 1');
}
