import { FC } from 'react'

import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/Shared/Lib/Hooks/reduxHooks'
import { selectIsAuthorized } from '@/Entities/Session'
type Props = {
    children: JSX.Element
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
    const isAuth = useAppSelector(selectIsAuthorized)
    const navigate = useNavigate()

    return isAuth ? (
        children
    ) : (
        <div className="auth">
            <p> Для просмотра страницы, выполните вход</p>
            <button onClick={() => navigate('/auth')}>Пройти авторизацию</button>
        </div>
    )
}
