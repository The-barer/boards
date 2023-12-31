import { PropsWithChildren } from 'react'
import style from './button.module.scss'

interface Props extends PropsWithChildren {}

export const Button = (props: Props) => {
    const { children } = props
    return (
        <button type="submit" className={style.btn}>
            {children}
        </button>
    )
}
