import { type FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { type BaseQueryApi, type QueryReturnValue } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import { Mutex } from 'async-mutex'

import { baseQuery } from './baseQuery'
import { invalidateAccessToken } from './invalidateTokenEvent'

const mutex = new Mutex()
const AUTH_ERROR_CODES = new Set([401])

export async function baseQueryWithReauth(
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: object,
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> {
    // TODO на сколько ты хорошо понял как работать с этой либой
    // TODO если не сильно я бы убрал ее
    await mutex.waitForUnlock()

    // TODO так у них же есть своя функция для release
    // const release = await mutex.acquire()

    try {
        const result = await baseQuery(args, api, extraOptions)

        if (typeof result.error?.status === 'number' && AUTH_ERROR_CODES.has(result.error.status)) {
            api.dispatch(invalidateAccessToken())
            //тут надо дождаться отработки события. как понять?
        }

        return result
    } finally {
        // TODO так у них же есть своя функция для release
        // release()
        mutex.release()
    }
}
