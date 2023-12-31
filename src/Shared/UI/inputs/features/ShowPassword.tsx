import showIcon from '@assets/icons/show.svg'
import hideIcon from '@assets/icons/Hide.svg'
import { useState } from 'react'
import style from './showPassword.module.scss'

type Props = {
    setType: (type: string) => void
}
export const ShowPassword = ({ setType }: Props) => {
    const [state, setState] = useState(true)
    const toggle = () => {
        setState(!state)
        setType(!state ? 'password' : 'text')
    }

    return (
        <button className={style.btn} onMouseDown={toggle} onMouseUp={toggle}>
            <img
                src={state ? showIcon : hideIcon}
                alt={`${state ? 'Show' : 'Hide'} password`}
                className={style.image}
            />
        </button>
    )
}
