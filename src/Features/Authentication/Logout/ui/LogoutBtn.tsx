import logoutIcon from '@assets/icons/interface-log-out.svg'
import style from './logoutBtn.module.scss'
import { useAppDispatch } from '@/Shared/Lib/Hooks'
import { logoutThunk } from '..'

export const LogoutBtn = () => {
    const LOGOUT_TEXT = 'Log out'
    const dispatch = useAppDispatch()
    // const navigate = useNavigate()

    const handelLogout = async () => {
        dispatch(logoutThunk())
    }

    return (
        <button className={style.button} onClick={handelLogout}>
            <img src={logoutIcon} className={style.image} alt="Log out user" />
            <div className="logoutText">{LOGOUT_TEXT}</div>
        </button>
    )
}
