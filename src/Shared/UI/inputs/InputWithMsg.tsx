import style from './InputWithMsg.module.scss'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    label: string
    type: string
    error: string
    valid: boolean
    inputOptions: Partial<InputOptions>
}

type InputOptions = {
    placeholder: string
    name: string
    id: string
    onChange: (e: React.FormEvent<HTMLInputElement>) => void
    onBlur: (e: React.FormEvent<HTMLInputElement>) => void
}

export const InputWithMsg = (props: Props) => {
    const { children, label, error, inputOptions, type } = props

    return (
        <div className={style.inputFrame}>
            <label htmlFor={type} className={style.label}>
                {label}
            </label>
            <div className={style.inputField}>
                <input
                    className={error && style.invalid}
                    placeholder={type}
                    name={type}
                    type={type}
                    id={type}
                    {...inputOptions}
                    autoComplete="on"
                />
                <div className={style.inputFeatures}>{children}</div>
            </div>
            {error && <div className={style.errorMessage}>{error}</div>}
        </div>
    )
}
