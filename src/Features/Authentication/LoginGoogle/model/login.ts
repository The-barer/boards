import { createAsyncThunk } from '@reduxjs/toolkit'
import { sessionApi } from '@/Entities/Session/'
import { isServerError } from '@/Shared/Api'
import { setUserData } from '@/Entities/User'

export const loginGoogleThunk = createAsyncThunk<void, string, { state: RootState }>(
    'session/loginGoogle',
    async (searchParams: string, { dispatch }) => {
        try {
            const response = await dispatch(
                sessionApi.endpoints.loginGoogle.initiate(searchParams),
            ).unwrap()
            dispatch(setUserData(response.user))
        } catch (error) {
            if (isServerError(error)) {
                throw new Error(error.data.message.toString())
            }

            throw new Error('Unknown error')
        }
    },
)
