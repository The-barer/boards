import { type FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
type ServerError = {
    message: string | string[]
    statusCode: number
    error: string
}

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error
}

export function isServerError(error: unknown): error is ServerError {
    return (
        typeof error === 'object' &&
        error != null &&
        'message' in error &&
        'statusCode' in error &&
        'error' in error
    )
}
