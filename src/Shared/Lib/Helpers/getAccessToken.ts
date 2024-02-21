import { jwtNotExp } from './jwt.helper'
import { getAccessTokenFromLocalStorage, removeTokenFromLocalStorage } from './localStorage.helper'

export function getAccessToken() {
    const accessToken = getAccessTokenFromLocalStorage()

    if (!(accessToken && jwtNotExp(accessToken))) {
        removeTokenFromLocalStorage()
        return null
    }
    return accessToken
}
