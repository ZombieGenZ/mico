export interface TokenResponse {
    code: string,
    message: string,
    authenticate: {
        access_token: string,
        refresh_token: string
    }
}