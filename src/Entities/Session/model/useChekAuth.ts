import { selectIsAuthorized } from '@/Entities/Session'
import { getAccessToken } from '@/Shared/Lib/Helpers/getAccessToken'
import { useAppDispatch, useAppSelector } from '@/Shared/Lib/Hooks'
import { refreshThunk } from './refreshToken'

export const useChekAuth = () => {
    const authorized = useAppSelector(selectIsAuthorized)
    const dispatch = useAppDispatch()

    if (authorized) {
        return true
    } else {
        const token = getAccessToken()

        if (token) {
            return true
        }

        const refresh = document.cookie.indexOf('refreshToken')

        if (refresh === 0) {
            console.log('Got refresh token, try to update')

            dispatch(refreshThunk())
            return true
        }
    }

    return false
}
