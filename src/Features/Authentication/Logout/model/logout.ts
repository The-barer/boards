import { createAsyncThunk } from '@reduxjs/toolkit'
import { clearSessionData, sessionApi } from '@/Entities/Session'
import { USER_TAG, isFetchBaseQueryError, isServerError } from '@/Shared/Api'
import { userApi } from '@/Entities/User/API/user.api'
import { clearUserData } from '@/Entities/User'
import { wait } from '@/Shared/Lib/Helpers'

export const logoutThunk = createAsyncThunk<void, void, { state: RootState }>(
    'authentication/logout',
    async (_: unknown, { dispatch }) => {
        try {
            await dispatch(sessionApi.endpoints.logout.initiate()).unwrap()
            dispatch(clearUserData())
            dispatch(clearSessionData())

            await wait(10)

            dispatch(userApi.util.invalidateTags([USER_TAG]))
            dispatch(sessionApi.util.resetApiState())
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
