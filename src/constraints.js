import { Set } from 'immutable';

// Constraint Types
export const UNIQUE = 'Unique'; // { attr: 'Attribute Name' }

export class Constraint {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
}

export class IConstraintEnforcer {
    createObject(record) {}
}

class UniqueConstraintEnforcer extends IConstraintEnforcer {
    constructor(constraintData, uniqueValues) {
        super();

        this.constraintData = constraintData;
        this.uniqueValues = uniqueValues || new Set();
    }

    createObject(record) {
        const newValue = record[this.constraintData.data.attr];

        if (this.uniqueValues.includes(newValue))
            throw new Error('Oh no!');

        return new UniqueConstraintEnforcer(this.constraintData, this.uniqueValues.add(newValue));
    }
}

export function toConstraintEnforcer(constraint) {
    switch (constraint.type) {
        case UNIQUE:
            return new UniqueConstraintEnforcer(constraint.data);

        default:
            throw new Error(`Unknown condition type: ${constraint.type}`);
    }
}
