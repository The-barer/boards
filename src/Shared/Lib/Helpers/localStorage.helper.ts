export function getAccessTokenFromLocalStorage(): string {
    const data = localStorage.getItem('accessToken')
    const token = data ? JSON.parse(data) : ''
    return token
}

export function setAccessTokenToLocalStorage(token: string): void {
    if (token.length > 10) {
        localStorage.setItem('accessToken', JSON.stringify(token))
    } else {
        console.log('set token err')
    }
}

export function removeTokenFromLocalStorage(): void {
    localStorage.removeItem('accessToken')
}
