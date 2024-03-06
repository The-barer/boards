import { type FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { type BaseQueryApi, type QueryReturnValue } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import { Mutex } from 'async-mutex'

import { baseQuery } from './baseQuery'
import { invalidateAccessToken } from './invalidateTokenEvent'
import { wait } from '../Lib/Helpers'

const mutex = new Mutex()
const AUTH_ERROR_CODES = new Set([401])

export async function baseQueryWithReauth(
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: object,
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> {
    await mutex.waitForUnlock()

    let result = await baseQuery(args, api, extraOptions)

    if (typeof result.error?.status === 'number' && AUTH_ERROR_CODES.has(result.error.status)) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()

            try {
                api.dispatch(invalidateAccessToken())

                await wait(10)

                result = await baseQuery(args, api, extraOptions)
            } finally {
                release()
            }
        } else {
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }

    return result
}
