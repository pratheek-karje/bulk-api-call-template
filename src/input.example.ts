/**
 * Copy this example.input.ts file to input.ts
 * and update the file with required values
 */


export interface ReqItem {
    // DATA
    someId: string

    // META DATA
    errMsg?: string
    err?: Error
    success?: boolean
}

export interface ReqItemMap {
    [id: string]: ReqItem
}

export const reqItemsMap: ReqItemMap = {
    '__SOME_ID1__': { someId: '__SOME_ID1__' },
    '__SOME_ID2__': { someId: '__SOME_ID2__' },
    '__SOME_ID3__': { someId: '__SOME_ID3__' },
    '__SOME_ID4__': { someId: '__SOME_ID4__' },
    '__SOME_ID5__': { someId: '__SOME_ID5__' },
    '__SOME_ID6__': { someId: '__SOME_ID6__' },
    '__SOME_ID7__': { someId: '__SOME_ID7__' },
    '__SOME_ID8__': { someId: '__SOME_ID8__' },
    '__SOME_ID9__': { someId: '__SOME_ID9__' },
}
