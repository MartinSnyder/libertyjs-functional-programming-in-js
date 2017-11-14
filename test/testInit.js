import { assert, expect } from 'chai';
import { SimpleDataStore, Conditions } from '../src/index';

describe('This Project', () => {
    it('Contains the SimpleDataStore class', () => assert(SimpleDataStore !== null));
});

describe('Conditions.toPredicate', () => {
    it('returns the same thing for null and the ALL Condition', () => {
        assert(Conditions.toPredicate() === Conditions.toPredicate(new Conditions.Condition(Conditions.ALL)));
    });
});

describe('SimpleDataStore', () => {
    const ds = new SimpleDataStore();

    it('Allows records to be added', () => {
        ds.write(ctx => {
            ctx.create({ id: 1});
            ctx.create({ id: 2});
            ctx.create({ id: 3});
        })
    });

    it('allows retrieval of all records', () => {
        assert(ds.read(ctx => ctx.retrieveWhere()).length === 3);
    });

    it('allows query for specific record', () => {
        const condition = new Conditions.Condition(Conditions.EQUALS, {attr: 'id', value: 2});
        const matchingRecords = ds.read(ctx => ctx.retrieveWhere(condition));

        assert(matchingRecords.length === 1);
        assert(matchingRecords[0].id === 2);
    });
});
