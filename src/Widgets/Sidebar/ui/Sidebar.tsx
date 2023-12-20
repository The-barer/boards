import { UserCardSmall } from '@/Entities/User'
import style from './sidebar.module.scss'
import { LogoutBtn } from '@/Features/Authentication/Logout'
import { BoardsMenu } from '@/Features/Category/DraggableList'

export const Sidebar = () => {
    return (
        <div className={style.sidebar}>
            <UserCardSmall />

            <BoardsMenu />
            <LogoutBtn />
        </div>
    )
}
