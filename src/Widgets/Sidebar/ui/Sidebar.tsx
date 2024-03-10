import { UserCardSmall } from '@/Entities/Session'
import { LogoutBtn } from '@/Features/Authentication/Logout'
import { BoardsMenu } from '@/Features/Boards/DraggableList'

import style from './sidebar.module.scss'

export const Sidebar = () => {
    return (
        <div className={style.sidebar}>
            <UserCardSmall />

            <BoardsMenu />
            <LogoutBtn />
        </div>
    )
}
