import { jwtNotExp } from './jwt.helper'
import { getAccessTokenFromLocalStorage, removeTokenFromLocalStorage } from './localStorage.helper'

export function getAccessToken() {
    let accessToken = getAccessTokenFromLocalStorage()

    if (!(accessToken && jwtNotExp(accessToken))) {
        accessToken = ''
        removeTokenFromLocalStorage()
    }
    return accessToken
}
