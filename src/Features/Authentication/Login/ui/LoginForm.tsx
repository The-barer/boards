import { useState } from 'react'
import { useAppDispatch } from '@/Shared/Lib/Hooks/reduxHooks'
import { InputWithMsg } from '@/Shared/UI/inputs/InputWithMsg'
import { ShowPassword } from '@/Shared/UI/inputs/features/ShowPassword'
import { useInput } from '@/Shared/Lib/Hooks/useInput'
import { Button } from '@/Shared/UI/inputs/button'
import { loginThunk } from '..'
import { LoginParams } from '../model/login'
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

    const dispatch = useAppDispatch()

    const handelLogin = async (params: LoginParams) => {
        dispatch(loginThunk(params))
            .unwrap()
            .then(() => {
                console.log('success login')
                onSuccess()
            })
            .catch((error: unknown) => {
                //setError message?
                console.log(error)
            })
    }

    const handelSubmit = async (e: React.FormEvent<HTMLFormElement & LoginFormFields>) => {
        e.preventDefault()
        e.stopPropagation()
        if (email.valid && password.valid) {
            const data = {
                email: e.currentTarget.email.value,
                password: e.currentTarget.password.value,
            }
            await handelLogin(data)
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

            <Button>Login</Button>
        </form>
    )
}
