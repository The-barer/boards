import { ITask } from '../model/taskTypes'
import style from './task.module.scss'

import { useNavigate } from 'react-router-dom'

export const TaskSmall = (props: ITask) => {
    const { title, description } = props
    const navigate = useNavigate()

    return (
        <div
            className={[style.taskItem].join(' ')}
            onClick={() => {
                navigate(`/task/${props.id}`)
            }}
        >
            <div className={style.taskTitle}>{title}</div>
            <div className={style.taskDescription}>{description}</div>
        </div>
    )
}
