import { isEmail, minLength } from 'class-validator'
import { useState } from 'react'

type InputType = 'email' | 'password'

const validation = (value: string, type: InputType) => {
    let error = ''
    switch (type) {
        case 'email':
            if (!isEmail(value)) {
                error = 'Некорректный e-mail адресс'
            }
            break
        case 'password':
            if (!minLength(value, 6)) {
                error = 'Пароль должен быть больше 6 символов'
            }
            break
        default:
            break
    }

    return error
}

export const useInput = (initialtype: InputType) => {
    const [error, setError] = useState('')
    const [touched, setTouched] = useState(false)

    const onBlur = (e: React.FormEvent<HTMLInputElement>) => {
        if (!touched) {
            setTouched(true)
        }
        const value = e.currentTarget.value
        if (!value) {
            setError('Поле не может быть пустым')
        }
    }

    const LABEL = {
        email: 'Email',
        password: 'Password',
    }

    const validate = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        const errMessage = validation(value, initialtype)
        if (!errMessage && error) {
            setError('')
        }

        if (errMessage && !error) {
            setError(errMessage)
        }
        if (!touched) {
            setTouched(true)
        }
    }

    return {
        label: LABEL[initialtype],
        type: initialtype,
        inputOptions: { onBlur, onChange: validate },
        error,
        valid: !error && touched,
    }
}
