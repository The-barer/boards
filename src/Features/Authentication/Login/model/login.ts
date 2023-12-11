import { createAsyncThunk } from '@reduxjs/toolkit'
import { sessionApi } from '@/Entities/Session/'
import { isFetchBaseQueryError, isServerError } from '@/Shared/Api'
import { setUserData } from '@/Entities/User'

export type LoginParams = {
    email: Email
    password: string
}

export const loginThunk = createAsyncThunk<void, LoginParams, { state: RootState }>(
    'session/login',
    async (body: LoginParams, { dispatch }) => {
        try {
            const response = await dispatch(sessionApi.endpoints.login.initiate(body)).unwrap()
            dispatch(setUserData(response.user))
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                if (isServerError(error.data)) {
                    throw new Error(error.data.message.toString())
                }
            }

            throw new Error('Unknown error')
        }
    },
)
