export class IReadContext {
    retrieveWhere(condition) {}
}

export class IWriteContext extends IReadContext {
    create(obj) {}
}

export class IDataStore {
    // IReadContext => Any
    read(fReader) {}

    // IWriteContext => Any
    write(fWriter) {}
}
