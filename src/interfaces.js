export class IReadContext {
    retrieveWhere(condition) {}
}

export class IWriteContext extends IReadContext {
    create(obj) {}
    updateWhere(condition, obj) {}
    deleteWhere(condition) {}
}

export class IDataStore {
    // IReadContext => Any
    read(fReader) {}

    // IWriteContext => Any
    write(fWriter) {}
}
