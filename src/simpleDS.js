import { List } from 'immutable';
import { IReadContext, IWriteContext, IDataStore } from './interfaces';
import { toPredicate} from './conditions';

export default class DataStore extends IDataStore {
    constructor() {
        super();
        this.allRecords = new List();
    }

    read(fReader) {
        const self = this;

        class ReadContext extends IReadContext {
            retrieveWhere(condition) {
                throw new Error('Implement this function as part of Exercise 2');
            }
        }

        return fReader(new ReadContext());
    }

    write(fWriter) {
        const self = this;

        class WriteContext extends IWriteContext {
            retrieveWhere(condition) {
                throw new Error('Implement this function as part of Exercise 2');
            }

            createObject(record) {
                throw new Error('Implement this function as part of Exercise 2');
            }
        }

        fWriter(new WriteContext());
    }
}
