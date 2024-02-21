import { config } from '../Config/config'
import { getAccessToken } from '../Lib/Helpers/getAccessToken'

import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query/react'

export const baseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    object,
    FetchBaseQueryMeta
> = fetchBaseQuery({
    baseUrl: config.API_ENDPOINT,
    credentials: 'include',

    prepareHeaders: (headers) => {
        const accessToken = getAccessToken()

        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`)
        }

        // TODO так лучше не надо
        // !!accessToken && headers.set('Authorization', `Bearer ${accessToken}`)

        return headers
    },
})
