import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { sessionApi } from '@/Entities/Session'
import { useAppDispatch } from '@/Shared/Lib/Hooks'
import { openPopup } from '@/Shared/Lib/Helpers'
import { vkAuthUrl } from '../model/settings'

import LogoVK from '../assets/VK.svg?react'
import style from './LoginVK.module.scss'

export const LoginVK = ({ onSuccess }: { onSuccess: () => void }) => {
    const { type } = useParams()
    const dispatch = useAppDispatch()

    useEffect(() => {
        const handelLogin = async (searchParams: string) => {
            dispatch(sessionApi.endpoints.loginVK.initiate(searchParams))
                .unwrap()
                .then(() => onSuccess())
                .catch((err) => console.log(err))
        }

        if (type === 'vk' && location.search) {
            handelLogin(location.search)
        }
    }, [dispatch, onSuccess, type])

    const handelSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

        if (isMobile) {
            location.href = vkAuthUrl
        } else {
            const popup = openPopup(vkAuthUrl)
            if (popup) {
                const interval = setInterval(() => {
                    if (popup.closed) {
                        clearInterval(interval)
                        const search = popup.location.search
                        location.href = '/auth/vk' + search
                    }
                }, 1000)
            }
        }
    }

    return (
        <button onClick={handelSubmit} className={style.btn}>
            <LogoVK />
            <div className="text">Continue with VK!</div>
        </button>
    )
}
