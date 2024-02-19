import axios, { AxiosError } from 'axios'

import {
    getAccessTokenFromLocalStorage,
    removeTokenFromLocalStorage,
    setAccessTokenToLocalStorage,
} from '@/Shared/Lib/Helpers/localStorage.helper.ts'
// TODO часть импортов через @ часть нет, "единный стиль" покинул чат
import { IToken } from '../Lib/Types/types'
import { jwtNotExp } from '@/Shared/Lib/Helpers/jwt.helper.ts'
import { config } from './config'

const todoAppServer = axios.create({
    baseURL: config.API_ENDPOINT,
    withCredentials: true,
})

todoAppServer.interceptors.request.use((config) => {
    const token = getAccessTokenFromLocalStorage()
    // TODO часто состовное условие читать дольше чем просто название переменной
    const isTokenValid = token && !jwtNotExp(token)

    if (isTokenValid) {
        config.headers.Authorization = `Bearer ${token}`
        config.withCredentials = false
    } else {
        removeTokenFromLocalStorage()
    }

    return config
})

todoAppServer.interceptors.response.use(
    (config) => config,
    // TODO в аинхроной функции лучше работать через await
    async (error: AxiosError) => {
        const originalRequest = error.config
        // TODO приучись делать вертикальные отступы

        if (error.response?.status === 401) {
            let isTokenRefreshed = false

            try {
                // TODO вот тут как раз хорошо иметь отдельный апи сервис который тебя избавляет от мета информации который мы тут пишем
                // TODO достаем DATA, достаем сообщение от ошибке
                // TODO в идеале хочется иметь сервис который на запрос вернут или данные или уже ошиьку с нужным форматом Ошибки

                const { data } = await axios
                    .get(`${config.API_ENDPOINT}/auth/token`, {
                        withCredentials: true,
                    })
                    .catch((err) => {
                        throw new Error(err?.response?.data)
                    })

                const { accessToken }: IToken = data

                if (accessToken) {
                    setAccessTokenToLocalStorage(accessToken)
                    isTokenRefreshed = true
                }
            } catch (err) {
                console.log(err)
            }

            if (isTokenRefreshed) {
                console.log('Получен новый токен! Обновляю страницу')
                return originalRequest && todoAppServer.request(originalRequest)
            }
        }

        return Promise.reject(error.response?.data)
    },
)

export default todoAppServer
