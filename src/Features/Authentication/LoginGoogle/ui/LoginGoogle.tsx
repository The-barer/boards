import { useAppDispatch, usePopupClose } from '@/Shared/Lib/Hooks'
import { makeURL } from '@/Shared/Lib/Helpers'
import { useEffect, useRef, useState } from 'react'
import { settings } from '../model/settings'
import { loginGoogleThunk } from '../model/login'
import Logo from '../assets/google-icon-logo.svg?react'
import style from './LoginGoogle.module.scss'

export const LoginGoogle = ({ onSuccess }: { onSuccess: () => void }) => {
    const [searchParams, setSearchParams] = useState<URLSearchParams>()
    const wait = useRef(false)
    const dispatch = useAppDispatch()
    const link = makeURL(settings)

    const popup = usePopupClose(link, setSearchParams)

    useEffect(() => {
        const handelLogin = async (searchParams: URLSearchParams) => {
            dispatch(loginGoogleThunk(searchParams.toString()))
                .unwrap()
                .then(() => onSuccess())
                .catch((e: unknown) => {
                    console.log(e)
                })
        }

        if (wait.current && searchParams) {
            handelLogin(searchParams)
        }
    }, [dispatch, onSuccess, searchParams])

    const handelSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        wait.current = true
        popup.open()
    }

    return (
        <button onClick={handelSubmit} className={style.btn}>
            <Logo />
            <div className="text">Continue with Google!</div>
        </button>
    )
}
