import { assert } from 'chai';
import { library } from '../src/index';

describe('This Project', () => {
    it('Can run an ES6 unit test', () => assert(library !== null));
});
