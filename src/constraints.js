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

        throw new Error('Implement this function as part of Exercise 3');
    }

    createObject(record) {
        throw new Error('Implement this function as part of Exercise 3');
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
