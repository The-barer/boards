export interface IAuthConfig {
    baseUrl: string
    searchParams: {
        client_id: string
        redirect_uri: string
        display: string
        scope: string
        response_type: string
        state: string
    }
}
