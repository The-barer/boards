import style from './login.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { LoginForm } from '@/Features/Authentication/Login'
import { LoginVK } from '@/Features/Authentication/LoginVK'
import { SigninForm } from '@/Features/Authentication/SignIn'
import { LoginGoogle } from '@/Features/Authentication/LoginGoogle'

export const Login = () => {
    const { type } = useParams()
    const navigate = useNavigate()
    const onSuccess = () => {
        navigate('/', {})
    }

    if (type === 'signin') {
        return (
            <div className={style.loginWidget}>
                <div className={style.title}>Welcome to Boards</div>
                <div className={style.actions}>
                    <SigninForm onSuccess={onSuccess} />
                </div>
                <div className={style.footer}>
                    Already have an account?
                    <button className={style.link} onClick={() => navigate('/auth/login')}>
                        Log in
                    </button>
                </div>
            </div>
        )
    } else {
        return (
            <div className={style.loginWidget}>
                <div className={style.title}>Welcome to Boards</div>
                <div className={style.actions}>
                    <LoginForm onSuccess={onSuccess} />
                    <LoginVK onSuccess={onSuccess} />
                    <LoginGoogle onSuccess={onSuccess} />
                </div>
                <div className={style.footer}>
                    Don't have an account?
                    <button className={style.link} onClick={() => navigate('/auth/signin')}>
                        Sign up
                    </button>
                </div>
            </div>
        )
    }
}
