import { UserCardSmall } from '@/Entities/User'
import style from './sidebar.module.scss'
import { LogoutBtn } from '@/Features/Authentication/Logout'

export const Sidebar = () => {
    return (
        <div className={style.sidebar}>
            <UserCardSmall />

            <div className={style.boards}> Список категорий... </div>
            <LogoutBtn />
        </div>
    )
}
