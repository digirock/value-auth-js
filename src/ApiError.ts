export interface ApiErrorContent {
    code: string,
    message: string | { [name: string]: string } | string[]
}

export interface ApiError {
    errors: ApiErrorContent
}

export function parseApiError(result: any) {
    return JSON.parse(result.message) as ApiError;
}