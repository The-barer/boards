export function getAccessTokenFromLocalStorage(): string {
    const data = localStorage.getItem('accessToken')
    const token = data ? JSON.parse(data) : ''
    return token
}

export function setAccessTokenToLocalStorage(token: string): void {
    localStorage.setItem('accessToken', JSON.stringify(token))
}

export function removeTokenFromLocalStorage(): void {
    localStorage.removeItem('accessToken')
}
