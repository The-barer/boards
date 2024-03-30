import { useState } from 'react'

import { InputWithMsg } from '@/Shared/UI/inputs/InputWithMsg'
import { ShowPassword } from '@/Shared/UI/inputs/features/ShowPassword'
import { IUserLoginData, sessionApi } from '@/Entities/Session'
import { useAppDispatch } from '@/Shared/Lib/Hooks/reduxHooks'
import { useInput } from '@/Shared/Lib/Hooks/useInput'
import { isServerError } from '@/Shared/Api'

import style from './LoginForm.module.scss'

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
    const [errorMsg, setError] = useState<string>('')

    const dispatch = useAppDispatch()

    const handelLogin = async (params: IUserLoginData) => {
        //set loading
        await dispatch(sessionApi.endpoints.login.initiate(params))
            .unwrap()
            .then(() => {
                console.log('success login')

                onSuccess()
            })
            .catch((error) => {
                if (isServerError(error)) {
                    setError(error.data.message.toString())
                    console.log(errorMsg)
                } else {
                    setError(error.toString())
                    console.log('rejected', error)
                }
                //setError message?
            })
    }

    const handelSubmit = async (e: React.FormEvent<HTMLFormElement & LoginFormFields>) => {
        e.preventDefault()
        e.stopPropagation()
        if (email.valid && password.valid) {
            const authdata = {
                email: e.currentTarget.email.value,
                password: e.currentTarget.password.value,
            }

            await handelLogin(authdata)
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
