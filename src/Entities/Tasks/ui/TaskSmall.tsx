import { useAppDispatch } from '@/Shared/Lib/Hooks'
import { setDetailedTask } from '..'

import { ITask } from '../model/taskTypes'

import style from './task.module.scss'
import { TagChip } from './TagChip'

export const TaskSmall = (props: ITask) => {
    const { title, description, dueDate, tags: tagData } = props
    const dispatch = useAppDispatch()

    const tagColors: { [key: string]: string } = {
        food: '#EBF8E3',
        birthday: '#FFEDE5',
        fun: '#F2E2F2',
    }
    //Это тоже будем получать как пользовательские настройки из базы

    const tags = !tagData && dueDate ? ['food', 'birthday', 'fun', 'attention', 'game'] : null
    //для теста отображения тегов, пока в базе нет. потом заменить на список тегов у таска.

    return (
        <div
            className={[style.taskItem].join(' ')}
            onClick={() => {
                dispatch(setDetailedTask(props))
            }}
        >
            {tags && (
                <div className={style.taskTags}>
                    {tags.map((tagTitle) => {
                        return (
                            <TagChip key={tagTitle} color={tagColors[tagTitle]} title={tagTitle} />
                        )
                    })}
                </div>
            )}
            <div className={style.taskTitle}>{title}</div>
            <div className={style.taskDescription}>
                {description.length < 150 ? description : description.slice(0, 150).concat('...')}
            </div>
            {dueDate && <div className={style.date}>{new Date(dueDate).toDateString()}</div>}
        </div>
    )
}
