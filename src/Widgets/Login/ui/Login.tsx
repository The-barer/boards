import style from './login.module.scss'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '@/Features/Authentication/Login'
import { LoginVK } from '@/Features/Authentication/LoginVK'
import { SigninForm } from '@/Features/Authentication/SignIn'
import { useState } from 'react'

export const Login = () => {
    const [isLogin, setIsLogin] = useState(true)
    const navigate = useNavigate()
    const onSuccess = () => {
        navigate('/')
    }
    return (
        <div className={style.loginWidget}>
            <div className={style.title}>Welcome to Boards</div>
            <div className={style.actions}>
                {isLogin ? (
                    <>
                        <LoginForm onSuccess={onSuccess} />
                        <LoginVK onSuccess={onSuccess} />
                    </>
                ) : (
                    <SigninForm onSuccess={onSuccess} />
                )}
            </div>
            <div className={style.footer}>
                {isLogin ? "Don't" : 'Already'} have an account?{' '}
                <button className={style.link} onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Sign up' : 'Log in'}
                </button>
            </div>
        </div>
    )
}
