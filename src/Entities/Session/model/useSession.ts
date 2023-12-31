import { useAppDispatch, useAppSelector } from '@/Shared/Lib/Hooks'
import { invalidateAccessToken } from '@/Shared/Api'

import { selectSession, setToken } from '..'
import { getAccessToken } from '@/Shared/Lib/Helpers/getAccessToken'

export const useSession = () => {
    const dispatch = useAppDispatch()
    const session = useAppSelector(selectSession)
    if (!session.isAuthorized) {
        const token = getAccessToken()
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
