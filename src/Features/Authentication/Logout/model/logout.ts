import { createAsyncThunk } from '@reduxjs/toolkit'
import { clearSessionData, sessionApi } from '@/Entities/Session'
import { CATEGORIES_TAG, SESSION_TAG, USER_TAG, isServerError } from '@/Shared/Api'

import { clearUserData } from '@/Entities/User'

export const logoutThunk = createAsyncThunk<void, void, { state: RootState }>(
    'authentication/logout',
    async (_: unknown, { dispatch }) => {
        try {
            await dispatch(sessionApi.endpoints.logout.initiate()).unwrap()

            dispatch(clearUserData())
            dispatch(clearSessionData())

            dispatch(sessionApi.util.resetApiState())
            dispatch(sessionApi.util.invalidateTags([SESSION_TAG, USER_TAG, CATEGORIES_TAG]))
        } catch (error) {
            if (isServerError(error)) {
                throw new Error(error.data.message.toString())
            }

            throw new Error('Unknown error')
        }
    },
)
