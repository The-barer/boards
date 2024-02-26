import { useAppDispatch } from '@/Shared/Lib/Hooks'
import { setDetailedTask } from '..'

import { ITask } from '../model/taskTypes'

import style from './task.module.scss'

export const TaskSmall = (props: ITask) => {
    const { title, description, dueDate } = props
    const dispatch = useAppDispatch()

    return (
        <div
            key={props.id}
            className={[style.taskItem].join(' ')}
            onClick={() => {
                dispatch(setDetailedTask(props))
            }}
        >
            <div className={style.taskTitle}>{title}</div>
            <div className={style.taskDescription}>
                {description.length < 150 ? description : description.slice(0, 150).concat('...')}
            </div>
            {dueDate && <div className={style.date}>{new Date(dueDate).toDateString()}</div>}
        </div>
    )
}
