import showIcon from '@assets/icons/show.svg'
import hideIcon from '@assets/icons/Hide.svg'
import { useState } from 'react'

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
        <img
            src={state ? showIcon : hideIcon}
            alt={`${state ? 'Show' : 'Hide'} password`}
            onMouseDown={toggle}
            onMouseUp={toggle}
        />
    )
}
