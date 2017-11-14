import { List } from 'immutable';
import { IReadContext, IWriteContext, IDataStore } from "./interfaces";

export default class DataStore extends IDataStore {
    constructor() {
        super();
        this.allRecords = new List();

        this.allRecords.toJS();
    }

    read(fReader) {
        const self = this;

        class ReadContext extends IReadContext {
            retrieveWhere(query) {
                return self.allRecords.toJS();
            }
        }

        return fReader(new ReadContext());
    }

    write(fWriter) {
        const self = this;

        class WriteContext extends IWriteContext {
            retrieveWhere(query) {
                return self.allRecords.toJS();
            }

            create(record) {
                self.allRecords = self.allRecords.push(record);
            }

            updateWhere(query, obj) {

            }

            deleteWhere(query) {

            }
        }

        return fWriter(new WriteContext());
    }
}
