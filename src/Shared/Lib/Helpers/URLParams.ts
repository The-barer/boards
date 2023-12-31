type URLParams = {
    baseUrl: string
    searchParams: { [key: string]: string }
}

export const makeURL = ({ baseUrl, searchParams }: URLParams) => {
    const params = new URLSearchParams(searchParams)
    const url = `${new URL(baseUrl)}?${params.toString()}`
    return url
}
