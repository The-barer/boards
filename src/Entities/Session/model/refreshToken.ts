import { createAsyncThunk } from '@reduxjs/toolkit'
import { sessionApi } from '@/Entities/Session/'
import { isFetchBaseQueryError } from '@/Shared/Api'

export const refreshThunk = createAsyncThunk<void, void>(
    'session/refresh',
    async (_, { dispatch }) => {
        try {
            await dispatch(sessionApi.endpoints.refreshToken.initiate()).unwrap()
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                if (typeof error.data === 'string') {
                    throw new Error(error.data)
                }
            }

            throw new Error('Unknown error')
        }
    },
)
