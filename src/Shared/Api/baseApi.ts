import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from './baseQueryWithReauth'
import { USER_TAG, CATEGORIES_TAG, TASK_TAG, SESSION_TAG } from './tags'

export const baseApi = createApi({
    tagTypes: [USER_TAG, CATEGORIES_TAG, TASK_TAG, SESSION_TAG],
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
})
