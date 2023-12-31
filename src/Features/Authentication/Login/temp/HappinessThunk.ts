import { createAsyncThunk } from '@reduxjs/toolkit'
import { sessionApi } from '@/Entities/Session/'
import { isFetchBaseQueryError, isServerError } from '@/Shared/Api'
import { setUserData } from '@/Entities/User'

type PropsNastya = {
    luck: string
    happiness: number
    skills: number
}

export const HappinessThunk = createAsyncThunk<void, PropsNastya, { state: RootState }>(
    'session/login',
    async (body: PropsNastya, { dispatch }) => {
        try {
            const response = await dispatch(sessionApi.endpoints.login.initiate()).unwrap()
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
