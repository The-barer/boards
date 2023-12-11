import avatarIcon from '@assets/icons/default-avatar.svg'
import style from './UserCard.module.scss'
import { useProfileQuery } from '../API/user.api'

export const UserCardSmall = () => {
    const { data, isLoading } = useProfileQuery()
    // const { data, isLoading } = { data: false, isLoading: false }

    if (isLoading) {
        return <div className="loader">Loading...</div>
    }

    return (
        <div className={`${style.card} ${style.small}`}>
            <img src={data?.photo || avatarIcon} className={style.avatar} />
            <div>{data?.userName || 'Anonymous'}</div>
        </div>
    )
}
