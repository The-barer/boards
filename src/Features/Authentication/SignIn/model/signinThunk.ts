import { createAsyncThunk } from '@reduxjs/toolkit'
import { sessionApi } from '@/Entities/Session/'
import { isFetchBaseQueryError, isServerError } from '@/Shared/Api'
import { IUserCreateProfile, setUserData } from '@/Entities/User'

export const signinThunk = createAsyncThunk<void, IUserCreateProfile, { state: RootState }>(
    'session/Sigin',
    async (body: IUserCreateProfile, { dispatch }) => {
        try {
            const response = await dispatch(sessionApi.endpoints.signin.initiate(body)).unwrap()
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
