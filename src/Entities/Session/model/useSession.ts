import { useAppDispatch, useAppSelector } from '@/Shared/Lib/Hooks'
import { invalidateAccessToken } from '@/Shared/Api'
import { getAccessTokenFromLocalStorage } from '@/Shared/Lib/Helpers/localStorage.helper'
import { selectSession, setToken } from '..'

export const useSession = () => {
    const dispatch = useAppDispatch()
    const session = useAppSelector(selectSession)
    if (!session.isAuthorized) {
        const token = getAccessTokenFromLocalStorage()
        if (token) {
            console.log('диспатч сессии из локал стороджа')
            dispatch(setToken(token))
        }
        if (!token) {
            const refresh = document.cookie.indexOf('refreshToken')
            if (refresh === 0) {
                console.log('запуск рефреша')
                dispatch(invalidateAccessToken())
            }
        }
    }

    return session
}
