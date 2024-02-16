import { isEmail, isEmpty, isNotEmpty, isURL, maxLength, minLength } from 'class-validator'
import { useState } from 'react'

type InputType = 'email' | 'password' | 'username' | 'photo'

const validation = (value: string, type: InputType) => {
    let error = ''
    switch (type) {
        case 'email':
            if (isEmpty(value)) {
                error = 'Поле не может быть пустым'
            } else if (!isEmail(value)) {
                error = 'Некорректный e-mail адресс'
            }

            break
        case 'password':
            if (isEmpty(value)) {
                error = 'Поле не может быть пустым'
            } else if (!minLength(value, 6)) {
                error = 'Пароль должен быть больше 6 символов'
            }
            break
        case 'username':
            if (isNotEmpty(value) && !minLength(value, 3) && !maxLength(value, 20)) {
                error = 'Имя должно быть от 3 до 20 символов'
            }
            break
        case 'photo':
            if (isNotEmpty(value) && !isURL(value)) {
                error = 'Фото должно быть ссылкой'
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

    const LABEL = {
        email: 'Email',
        password: 'Password',
        username: 'Username',
        photo: 'Photo',
    }

    const TYPE = {
        email: 'email',
        password: 'password',
        username: 'text',
        photo: 'url',
    }

    const OPTIONAL = ['username', 'photo']

    if (!touched && OPTIONAL.includes(initialtype)) {
        setTouched(true)
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
        type: TYPE[initialtype],

        inputOptions: {
            onBlur: validate,
            onChange: validate,
            name: initialtype,
            placeholder: LABEL[initialtype],
            id: initialtype,
        },
        error,
        valid: !error && touched,
    }
}
