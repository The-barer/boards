import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/Shared/Lib/Hooks/reduxHooks'
import { selectIsAuthorized } from '@/Entities/Session'
import { PropsWithChildren } from 'react'
import style from './protectedRoute.module.scss'

interface ProtectedRoute extends PropsWithChildren {
    role?: string
}

export const ProtectedRoute: FC<ProtectedRoute> = ({ children, role = 'guest' }) => {
    const isAuth = useAppSelector(selectIsAuthorized)
    const userRoles = ['admin', 'editor', 'guest']
    //В последствии использовать селектор ролей пользователя.

    const navigate = useNavigate()

    return userRoles.includes(role) && isAuth ? (
        children
    ) : (
        <div className={style.auth}>
            <p> Для просмотра страницы, недостаточно прав.</p>
            {!isAuth && <button onClick={() => navigate('/auth')}>Пройти авторизацию</button>}
        </div>
    )
}
