import { createListenerMiddleware, type TypedStartListening } from '@reduxjs/toolkit'
import { invalidateAccessToken } from '@/Shared/Api/invalidateTokenEvent'
import { getAccessToken } from '@/Shared/Lib/Helpers/getAccessToken'
import { sessionApi } from '@/Entities/Session/'
import { logoutThunk } from '../../Logout'
import { setAccessTokenToLocalStorage } from '@/Shared/Lib/Helpers/localStorage.helper'

export const invalidateAccessTokenListener = createListenerMiddleware()

export type TypedListening = TypedStartListening<RootState, AppDispatch>

export const startInvalidateAccessTokenListener =
    invalidateAccessTokenListener.startListening as TypedListening

startInvalidateAccessTokenListener({
    actionCreator: invalidateAccessToken,
    effect: async (_, api) => {
        const session = api.getState().session

        if (session.isAuthorized && session.accessToken) {
            setAccessTokenToLocalStorage(session.accessToken)
        }

        let token = getAccessToken()
        const refresh = document.cookie.indexOf('refreshToken')

        if (!token && refresh === 0) {
            await api
                .dispatch(sessionApi.endpoints.refreshToken.initiate())
                .unwrap()
                .then(({ accessToken }) => {
                    token = accessToken
                })
                .catch(() => {
                    document.cookie = 'refreshToken' + '=; Max-Age=0'
                    console.log('ошибка обновления токена')
                })
        }

        if (!token) {
            api.dispatch(logoutThunk())
        }
    },
})
