import { type FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { type BaseQueryApi, type QueryReturnValue } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import { baseQuery } from './baseQuery'
import { invalidateAccessToken } from './invalidateTokenEvent'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

const AUTH_ERROR_CODES = new Set([401])

export async function baseQueryWithReauth(
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: object,
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> {
    await mutex.waitForUnlock()

    const release = await mutex.acquire()

    try {
        const result = await baseQuery(args, api, extraOptions)

        if (typeof result.error?.status === 'number' && AUTH_ERROR_CODES.has(result.error.status)) {
            api.dispatch(invalidateAccessToken())
            //тут надо дождаться отработки события. как понять?
        }

        return result
    } finally {
        release()
    }
}
