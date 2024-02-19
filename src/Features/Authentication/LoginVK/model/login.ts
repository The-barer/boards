import { createAsyncThunk } from '@reduxjs/toolkit'
import { sessionApi } from '@/Entities/Session/'
import { isFetchBaseQueryError, isServerError } from '@/Shared/Api'
import { setUserData } from '@/Entities/User'

export const loginVKThunk = createAsyncThunk<void, string, { state: RootState }>(
    'session/loginVK',
    async (searchParams: string, { dispatch }) => {
        try {
            const response = await dispatch(
                sessionApi.endpoints.loginVK.initiate(searchParams),
            ).unwrap()
            dispatch(setUserData(response.user))
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                // TODO а зачем нам вложенный if?
                if (isServerError(error.data)) {
                    throw new Error(error.data.message.toString())
                }
            }

            throw new Error('Unknown error')
        }
    },
)
