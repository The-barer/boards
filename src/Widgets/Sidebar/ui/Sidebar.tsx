import { UserCardSmall } from '@/Entities/User'
import style from './sidebar.module.scss'
import { LogoutBtn } from '@/Features/Authentication/Logout'
import { CategoryItem } from '@/Entities/Category/ui/categoryItem'

const category1 = {
    id: '137b1b88-d3a8-41db-842e-abfd329cecf9',
    title: 'Birthday',
    priorityOrder: 100,
    createdAt: '2023-11-22T18:28:59.052Z',
    updatedAt: '2023-11-22T18:28:59.052Z',
    tasks: [],
}

export const Sidebar = () => {
    return (
        <div className={style.sidebar}>
            <UserCardSmall />

            <CategoryItem {...category1} />
            <LogoutBtn />
        </div>
    )
}
