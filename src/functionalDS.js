import { List } from 'immutable';
import { IReadContext, IWriteContext, IDataStore } from './interfaces';
import { toConstraintEnforcer} from './constraints';
import ImmutableSnapshot from './immutableSnapshot';

// Operation types
const CREATE = 'Create'; // { record: record }

class Operation {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
}

class TransactionContext extends IWriteContext {
    constructor(initialSnapshot) {
        super();

        this.currentSnapshot = initialSnapshot;
        this.operations = [];
    }

    retrieveWhere(condition) {
        return this.currentSnapshot.retrieveWhere(condition);
    }

    createObject(record) {
        throw new Error('Implement this function as part of Exercise 4');
    }

    commitTo(otherSnapshot) {
        throw new Error('Implement this function as part of Exercise 4');
    }
}

export default class DataStore extends IDataStore {
    constructor(constraints) {
        super();

        // Enable this as part of Exercise 3
        // this.currentSnapshot = new ImmutableSnapshot(new List(), (constraints || []).map(toConstraintEnforcer));
    }

    read(fReader) {
        const self = this;

        class ReadContext extends IReadContext {
            retrieveWhere(condition) {
                return self.currentSnapshot.retrieveWhere(condition);
            }
        }

        return fReader(new ReadContext());
    }

    write(fWriter) {
        const self = this;

        // Implement this function as part of Exercise 4
        class WriteContext extends IWriteContext {
            retrieveWhere(condition) {
                return self.currentSnaphot.retrieveWhere(condition);
            }

            createObject(record) {
                self.currentSnaphot = self.currentSnaphot.createObject(record);
            }
        }

        return fWriter(new WriteContext());
    }
}
