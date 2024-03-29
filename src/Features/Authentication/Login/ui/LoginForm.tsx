import { useState } from 'react'

import { InputWithMsg } from '@/Shared/UI/inputs/InputWithMsg'
import { useAppDispatch } from '@/Shared/Lib/Hooks/reduxHooks'
import { ShowPassword } from '@/Shared/UI/inputs/features/ShowPassword'
import { useInput } from '@/Shared/Lib/Hooks/useInput'

import style from './LoginForm.module.scss'
import { IUserLoginData, sessionApi } from '@/Entities/Session'
import { isServerError } from '@/Shared/Api'

type LoginFormFields = {
    email: HTMLInputElement
    password: HTMLInputElement
}

type Props = {
    onSuccess: () => void
}

export function LoginForm({ onSuccess }: Props) {
    const email = useInput('email')
    const password = useInput('password')
    const [newType, setNewType] = useState<string>(password.type)

    const dispatch = useAppDispatch()

    const handelLogin = async (params: IUserLoginData) => {
        dispatch(sessionApi.endpoints.login.initiate(params))
            .unwrap()
            .then(() => {
                console.log('success login')
                onSuccess()
            })
            .catch((error) => {
                if (isServerError(error)) {
                    console.log(error.data.message)
                } else {
                    console.log('rejected', error)
                }
                //setError message?
            })
    }

    const handelSubmit = async (e: React.FormEvent<HTMLFormElement & LoginFormFields>) => {
        e.preventDefault()
        e.stopPropagation()
        if (email.valid && password.valid) {
            const loginData = {
                email: e.currentTarget.email.value,
                password: e.currentTarget.password.value,
            }
            await handelLogin(loginData)
        } else {
            //setError message?
        }
    }

    return (
        <form className={style.loginForm} onSubmit={handelSubmit}>
            <InputWithMsg {...email} />
            <InputWithMsg {...password} type={newType}>
                <ShowPassword setType={setNewType} />
            </InputWithMsg>

            <button type="submit" className={style.btnBlack}>
                Login
            </button>
        </form>
    )
}
