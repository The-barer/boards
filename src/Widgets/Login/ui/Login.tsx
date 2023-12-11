import style from './login.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { LoginForm } from '@/Features/Authentication/Login'
import { LoginVK } from '@/Features/Authentication/LoginVK'

export const Login = () => {
    const navigate = useNavigate()
    const onSuccess = () => {
        navigate('/')
    }
    return (
        <div className={style.loginWidget}>
            <div className={style.title}>Welcome to Boards</div>
            <div className={style.actions}>
                <LoginForm onSuccess={onSuccess} />
                <LoginVK onSuccess={onSuccess} />
            </div>
            <div className={style.footer}>
                Don't have an account?{' '}
                <Link className={style.link} to={'/auth/sigin'}>
                    Sign up
                </Link>
            </div>
        </div>
    )
}
