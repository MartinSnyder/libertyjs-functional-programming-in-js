import { List } from 'immutable';
import { IReadContext, IWriteContext, IDataStore } from "./interfaces";
import { toPredicate} from "./conditions";

export default class DataStore extends IDataStore {
    constructor() {
        super();
        this.allRecords = new List();

        this.allRecords.toJS();
    }

    read(fReader) {
        const self = this;

        class ReadContext extends IReadContext {
            retrieveWhere(condition) {
                return self.allRecords.filter(toPredicate(condition)).toJS();
            }
        }

        return fReader(new ReadContext());
    }

    write(fWriter) {
        const self = this;

        class WriteContext extends IWriteContext {
            retrieveWhere(condition) {
                return self.allRecords.filter(toPredicate(condition)).toJS();
            }

            create(record) {
                self.allRecords = self.allRecords.push(record);
            }

            updateWhere(condition, obj) {

            }

            deleteWhere(condition) {

            }
        }

        return fWriter(new WriteContext());
    }
}
