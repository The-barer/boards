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
        'data' in error &&
        typeof error.data === 'object' &&
        error.data != null &&
        'message' in error.data &&
        'statusCode' in error.data &&
        'error' in error.data
    )
}
