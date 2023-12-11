import { createListenerMiddleware, type TypedStartListening } from '@reduxjs/toolkit'
import { invalidateAccessToken } from '@/Shared/Api/invalidateTokenEvent'
import { getAccessToken } from '@/Shared/Lib/Helpers/getAccessToken'
import { sessionApi } from '@/Entities/Session/'
import { setAccessTokenToLocalStorage } from '@/Shared/Lib/Helpers/localStorage.helper'

export const invalidateAccessTokenListener = createListenerMiddleware()

export type TypedListening = TypedStartListening<RootState, AppDispatch>

export const startInvalidateAccessTokenListener =
    invalidateAccessTokenListener.startListening as TypedListening

startInvalidateAccessTokenListener({
    actionCreator: invalidateAccessToken,
    effect: async (_, api) => {
        const token = getAccessToken()

        if (!token) {
            try {
                const { accessToken } = await api
                    .dispatch(sessionApi.endpoints.refreshToken.initiate())
                    .unwrap()

                accessToken && setAccessTokenToLocalStorage(accessToken)
                console.log(` Get new accessToken: ${accessToken}`)
            } catch {
                console.log('новый токен не получен')
            }
        }
    },
})
