export interface IToken {
    accessToken: string
}

export interface IPlainObject<T> {
    [key: string]: T
}

export interface IAuthConfig {
    type: string
    baseUrl: string
    searchParams?: {
        client_id: string
        redirect_uri: string
        display?: string
        scope?: string
        response_type?: string
        state?: string
    }
}
