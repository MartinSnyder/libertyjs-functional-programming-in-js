import { List } from 'immutable';
import { IReadContext, IWriteContext, IDataStore } from './interfaces';
import { toConstraintEnforcer} from './constraints';
import ImmutableSnapshot from './immutableSnapshot';

export default class DataStore extends IDataStore {
    constructor(constraints) {
        super();
        this.currentSnaphot = new ImmutableSnapshot(new List(), (constraints || []).map(toConstraintEnforcer));
    }

    read(fReader) {
        const self = this;

        class ReadContext extends IReadContext {
            retrieveWhere(condition) {
                return self.currentSnaphot.retrieveWhere(condition);
            }
        }

        return fReader(new ReadContext());
    }

    write(fWriter) {
        const self = this;

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
