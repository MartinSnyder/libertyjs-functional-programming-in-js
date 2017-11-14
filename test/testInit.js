import { assert } from 'chai';
import { SimpleDataStore } from '../src/index';

describe('This Project', () => {
    it('Contains the SimpleDataStore class', () => assert(SimpleDataStore !== null));
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
    })
});
