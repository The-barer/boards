import { minLength } from 'class-validator'

export const validate = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    const valid = minLength(value, 6)
    if (valid) {
        return ''
    }

    if (!valid) {
        return 'Должно быть больше 6 символов'
    }
}
