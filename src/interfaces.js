export class IReadContext {
    retrieveWhere(query) {}
}

export class IWriteContext extends IReadContext {
    create(obj) {}
    updateWhere(query, obj) {}
    deleteWhere(query) {}
}

export class IDataStore {
    // IReadContext => Any
    read(fReader) {}

    // IWriteContext => Any
    write(fWriter) {}
}
