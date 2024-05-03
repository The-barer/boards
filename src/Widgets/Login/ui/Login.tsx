import { useCallback } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '@/Shared/Lib/Hooks'

import { LoginForm } from '@/Features/Authentication/Login'
import { LoginVK } from '@/Features/Authentication/LoginVK'
import { SigninForm } from '@/Features/Authentication/SignIn'
import { LoginGoogle } from '@/Features/Authentication/LoginGoogle'
import { Loader } from '@/Shared/UI'
import { selectisLoading } from '@/Entities/Session'

import style from './login.module.scss'

const SIGNIN = 'signin'
const LOGIN = 'login'

export const Login = () => {
    const { type } = useParams()
    const { state } = useLocation()
    const navigate = useNavigate()

    const onSuccess = useCallback(() => {
        let destination = '/'
        if (state?.requested) {
            destination = state?.requested
        }
        navigate(destination)
    }, [navigate, state?.requested])

    const isLoading = useAppSelector(selectisLoading)

    function renderActions() {
        if (type === SIGNIN) {
            return <SigninForm onSuccess={onSuccess} />
        }

        return (
            <>
                <LoginForm onSuccess={onSuccess} />
                <LoginVK onSuccess={onSuccess} />
                <LoginGoogle onSuccess={onSuccess} />
            </>
        )
    }

    function renderFooter() {
        if (type === SIGNIN) {
            return (
                <>
                    Already have an account?
                    <button className={style.link} onClick={() => navigate(`/auth/${LOGIN}`)}>
                        Log in
                    </button>
                </>
            )
        }

        return (
            <>
                Don't have an account?
                <button className={style.link} onClick={() => navigate(`/auth/${SIGNIN}`)}>
                    Sign up
                </button>
            </>
        )
    }

    return (
        <div className={style.loginWidget}>
            {isLoading && <Loader />}
            <div className={style.title}>Welcome to Boards</div>
            <div className={style.actions}>{renderActions()}</div>
            <div className={style.footer}>{renderFooter()}</div>
        </div>
    )
}
