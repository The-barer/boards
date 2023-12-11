import { UserCardSmall } from '@/Entities/User'
import { FC } from 'react'

export const SidePanel: FC = () => {
    // const avatarStyle: React.CSSProperties = {
    //     borderRadius: '50%',
    //     boxShadow: '4px 4px 14px rgba(77, 77, 77, 0.25)',
    //     display: 'inline-block',
    //     width: '6em',
    //     height: '6em',
    //     boxSizing: 'border-box',
    //     margin: '0px auto',
    //     verticalAlign: 'top',
    // }

    return (
        <div>
            <UserCardSmall />
        </div>
    )
}
