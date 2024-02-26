import { useAppDispatch } from '@/Shared/Lib/Hooks'
import { ITaskDetails, taskApi } from '..'
import style from './task.module.scss'

type TaskFull = {
    onReject: () => void
    onEdit: () => void
    task: ITaskDetails
}

export const TaskFull = ({ task, onReject, onEdit }: TaskFull) => {
    const dispatch = useAppDispatch()

    const onDelete = async (id: string) => {
        try {
            await dispatch(taskApi.endpoints.deleteTask.initiate(id)).unwrap()
            onReject()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className={style.taskTitle}>{task.title}</div>
            <div className={style.taskDescription}>{task.description}</div>
            {task.dueDate && (
                <div className={style.date}>{new Date(task.dueDate).toDateString()}</div>
            )}
            <a href={'/task/' + task.id}>Ссылка на таску</a>

            <div className={style.actions}>
                <button className={style.btnSecondary} onClick={() => task.id && onDelete(task.id)}>
                    Delete
                </button>
                <button type="submit" className={style.btnSecondary} onClick={onEdit}>
                    Edit
                </button>
                <button type="reset" className={style.btnPrimary} onClick={onReject}>
                    Close
                </button>
            </div>
        </>
    )
}
