import { useAppDispatch, usePopupClose } from '@/Shared/Lib/Hooks'
import { makeURL } from '@/Shared/Lib/Helpers'
import { useEffect, useRef, useState } from 'react'
import { settings } from '../model/settings'
import { loginVKThunk } from '../model/login'
import logo from '../assets/VK.svg'
import style from './LoginVK.module.scss'

export const LoginVK = ({ onSuccess }: { onSuccess: () => void }) => {
    const [searchParams, setSearchParams] = useState<URLSearchParams>()
    const wait = useRef(false)
    const dispatch = useAppDispatch()
    const link = makeURL(settings)

    const popup = usePopupClose(link, setSearchParams)

    useEffect(() => {
        const handelLogin = async (searchParams: URLSearchParams) => {
            dispatch(loginVKThunk(searchParams.toString()))
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
            <img src={logo} />
            <div className="text">Continue with VK!</div>
        </button>
    )
}
