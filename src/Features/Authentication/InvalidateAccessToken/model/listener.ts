import { createListenerMiddleware, type TypedStartListening } from '@reduxjs/toolkit'
import { invalidateAccessToken } from '@/Shared/Api/invalidateTokenEvent'
import { getAccessToken } from '@/Shared/Lib/Helpers/getAccessToken'
import { sessionApi } from '@/Entities/Session/'
import { logoutThunk } from '../../Logout'

export const invalidateAccessTokenListener = createListenerMiddleware()

export type TypedListening = TypedStartListening<RootState, AppDispatch>

export const startInvalidateAccessTokenListener =
    invalidateAccessTokenListener.startListening as TypedListening

startInvalidateAccessTokenListener({
    actionCreator: invalidateAccessToken,
    effect: async (_, api) => {
        let token = getAccessToken()

        if (token) {
            return
        }

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
