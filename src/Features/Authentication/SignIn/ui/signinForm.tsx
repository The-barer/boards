import { useState } from 'react'
import { useAppDispatch } from '@/Shared/Lib/Hooks/reduxHooks'
import { InputWithMsg } from '@/Shared/UI/inputs/InputWithMsg'
import { ShowPassword } from '@/Shared/UI/inputs/features/ShowPassword'
import { useInput } from '@/Shared/Lib/Hooks/useInput'

import style from './signinForm.module.scss'
import { IUserCreateProfile } from '@/Entities/User'
import { sessionApi } from '@/Entities/Session'
import { isServerError } from '@/Shared/Api'

type LoginFormFields = {
    email: HTMLInputElement
    password: HTMLInputElement
    userName: HTMLInputElement
    photo: HTMLInputElement
}

type Props = {
    onSuccess: () => void
}

export function SigninForm({ onSuccess }: Props) {
    const email = useInput('email')
    const password = useInput('password')
    const username = useInput('username')
    const photo = useInput('photo')

    const [newType, setNewType] = useState<string>(password.type)

    const [errorMsg, setError] = useState<string>('')

    const dispatch = useAppDispatch()

    const handelLogin = async (params: IUserCreateProfile) => {
        dispatch(sessionApi.endpoints.signin.initiate(params))
            .unwrap()
            .then(() => {
                console.log('success login')
                onSuccess()
            })
            .catch((error) => {
                if (isServerError(error)) {
                    setError(error.data.message.toString())
                } else {
                    setError(error.toString())
                }
            })
        console.log(errorMsg)
    }

    const handelSubmit = async (e: React.FormEvent<HTMLFormElement & LoginFormFields>) => {
        e.preventDefault()
        e.stopPropagation()
        if (email.valid && password.valid && username.valid && photo.valid) {
            const data = {
                email: e.currentTarget.email.value,
                password: e.currentTarget.password.value,
                userName: e.currentTarget.username.value || null,
                photo: e.currentTarget.photo.value || null,
            }

            console.log(data)
            await handelLogin(data)
        } else {
            setError('incorrect registration data')
        }
    }

    return (
        <form className={style.signinForm} onSubmit={handelSubmit}>
            {errorMsg && (
                <div className={style.error}>
                    Error: {errorMsg.slice(0, 50)}
                    {errorMsg.length > 50 && '...'}
                </div>
            )}
            <InputWithMsg {...email} />
            <InputWithMsg {...password} type={newType}>
                <ShowPassword setType={setNewType} />
            </InputWithMsg>
            <InputWithMsg {...username} />
            <InputWithMsg {...photo} />

            <button type="submit" className={style.btnBlack}>
                Registration
            </button>
        </form>
    )
}
