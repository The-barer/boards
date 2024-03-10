import { useAppDispatch } from '@/Shared/Lib/Hooks'
import { invalidateAccessToken } from '@/Shared/Api'
import { getAccessToken } from '@/Shared/Lib/Helpers/getAccessToken'

export const useCheckSession = () => {
    const dispatch = useAppDispatch()
    const token = getAccessToken()
    const refresh = document.cookie.indexOf('refreshToken') === 0
    if (!token) {
        dispatch(invalidateAccessToken())
    }

    return !!token || !!refresh
}
