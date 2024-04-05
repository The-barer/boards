import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { sessionApi } from '@/Entities/Session'
import { useAppDispatch } from '@/Shared/Lib/Hooks'
import { openPopup } from '@/Shared/Lib/Helpers'
import { googleAuthUrl } from '../model/settings'

import LogoGoogle from '../assets/google-icon-logo.svg?react'
import style from './LoginGoogle.module.scss'

export const LoginGoogle = ({ onSuccess }: { onSuccess: () => void }) => {
    const { type } = useParams()
    const dispatch = useAppDispatch()

    useEffect(() => {
        const handelLogin = async (searchParams: string) => {
            dispatch(sessionApi.endpoints.loginGoogle.initiate(searchParams))
                .unwrap()
                .then(() => onSuccess())
                .catch((e) => console.log(e))
        }

        if (type === 'google' && location.search) {
            handelLogin(location.search)
        }
    }, [dispatch, onSuccess, type])

    const handelSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

        if (isMobile) {
            location.href = googleAuthUrl
        } else {
            const popup = openPopup(googleAuthUrl)
            if (popup) {
                const interval = setInterval(() => {
                    if (popup.closed) {
                        clearInterval(interval)
                        const search = popup.location.search
                        location.href = '/auth/google' + search
                    }
                }, 1000)
            }
        }
    }

    return (
        <button onClick={handelSubmit} className={style.btnBlack}>
            <LogoGoogle />
            <div className="text">Continue with Google!</div>
        </button>
    )
}
