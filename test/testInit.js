import { assert, expect } from 'chai';
import { SimpleDataStore, FunctionalDataStore, Conditions, Constraints } from '../src/index';

describe('This Project', () => {
    it('Contains the SimpleDataStore class', () => assert(SimpleDataStore !== null));
});

describe('Conditions.toPredicate', () => {
    it('returns the same thing for null and the ALL Condition', () => {
        assert(Conditions.toPredicate() === Conditions.toPredicate(new Conditions.Condition(Conditions.ALL)));
    });

    it('throws errors that tell you what you might have done wrong', () => {
        expect(() => Conditions.toPredicate(new Conditions.Condition('MadeUpValue'))).to.throw(Error, /MadeUpValue/);
    })
});

function testDataStore(dataStore) {
    it('Allows records to be added', () => {
        dataStore.write(ctx => {
            ctx.createObject({ id: 1});
            ctx.createObject({ id: 2});
            ctx.createObject({ id: 3});
        })
    });

    it('allows retrieval of all records', () => {
        assert(dataStore.read(ctx => ctx.retrieveWhere()).length === 3);
    });

    it('allows query for specific record', () => {
        const condition = new Conditions.Condition(Conditions.EQUALS, {attr: 'id', value: 2});
        const matchingRecords = dataStore.read(ctx => ctx.retrieveWhere(condition));

        assert(matchingRecords.length === 1);
        assert(matchingRecords[0].id === 2);
    });
}

describe('SimpleDataStore', () => testDataStore(new SimpleDataStore()));
describe('FunctionalDataStore', () => testDataStore(new FunctionalDataStore()));
describe('Constrained FunctionalDataStore', () => {
    // Constrained Data Store tests
    const dataStore = new FunctionalDataStore([ new Constraints.Constraint(Constraints.UNIQUE, { attr: 'id' }) ]);

    testDataStore(dataStore);

    // Additional tests
    it('Prevents duplicate records from being added', () => {
        expect(() => dataStore.write(ctx => {
            ctx.createObject({ id: 1});
        })).to.throw(Error, 'Unique Constraint on attribute id violated by duplicate value 1');
    });
});
