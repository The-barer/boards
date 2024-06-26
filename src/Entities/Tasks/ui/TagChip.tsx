import { useAppDispatch } from '@/Shared/Lib/Hooks'
import style from './task.module.scss'
import { setTaskFilter } from '..'

interface iTagChip extends React.PropsWithChildren {
    title: string
    color?: string
}

export const TagChip = ({ title, color }: iTagChip) => {
    const dispatch = useAppDispatch()

    return (
        <div
            className={style.tag}
            style={{ '--tag-color': color } as React.CSSProperties}
            onClick={(e) => {
                e.stopPropagation()
                dispatch(
                    setTaskFilter({
                        type: 'tag',
                        value: title,
                    }),
                )
            }}
        >
            {title}
        </div>
    )
}
