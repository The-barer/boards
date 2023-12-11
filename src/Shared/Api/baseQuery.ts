import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query/react'
import { config } from './config'

import { getAccessToken } from '../Lib/Helpers/getAccessToken'

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

        !!accessToken && headers.set('Authorization', `Bearer ${accessToken}`)

        return headers
    },
})
