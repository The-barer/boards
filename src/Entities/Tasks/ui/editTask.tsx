import { useAppDispatch, useAppSelector } from '@/Shared/Lib/Hooks'
import { ITaskCreateDTO, ITaskDetails, ITaskUpdateDTO, taskApi } from '@/Entities/Tasks'

import { selectTasksStatuses } from '@/Entities/Tasks/model/taskSlice'
import { boardsList } from '@/Entities/Boards'

import style from './task.module.scss'

export type NewTask = {
    title: HTMLInputElement
    description: HTMLInputElement
    status: HTMLSelectElement
    dueDate?: HTMLInputElement
    priorityOrder?: number
    categoryId: HTMLSelectElement
}

type EditTask = {
    onSuccess?: () => void
    onReject: () => void
    type?: 'create' | 'update'
    task: ITaskDetails | null
}

export const EditTask = ({ onReject, type = 'create', task }: EditTask) => {
    const statuses = useAppSelector(selectTasksStatuses)
    const boards = useAppSelector(boardsList)

    const dispatch = useAppDispatch()

    const onCreate = async (task: ITaskCreateDTO) => {
        try {
            await dispatch(taskApi.endpoints.createTask.initiate(task)).unwrap()
        } catch (e) {
            console.log(e)
        }
    }

    const onUpdate = async (task: ITaskUpdateDTO) => {
        try {
            await dispatch(taskApi.endpoints.updateTask.initiate(task)).unwrap()
            await dispatch(taskApi.endpoints.getTask.initiate(task.id)).unwrap()
            onReject()
        } catch (e) {
            console.log(e)
        }
    }

    const handelSubmit = (e: React.FormEvent<HTMLFormElement & NewTask>) => {
        e.preventDefault()
        e.stopPropagation()
        const { title, categoryId, dueDate, description, status } = e.currentTarget

        const newTask: ITaskCreateDTO = {
            categoryId: categoryId.value,
            title: title.value,
            dueDate: dueDate?.value ? new Date(dueDate?.value) : undefined,
            description: description?.value,
            status: status.value,
        }

        switch (type) {
            case 'create':
                onCreate({ ...newTask })
                break

            case 'update':
                task?.id && onUpdate({ id: task?.id, ...newTask })
                break

            default:
                console.log('Task edit, wrong type')
                break
        }
    }

    const handelReset = () => {
        onReject()
    }

    return (
        <>
            <div className={style.taskTitle}>
                {type === 'create' ? 'Create task' : 'Update task'}
            </div>
            <form onSubmit={handelSubmit} onReset={handelReset}>
                <div className={style.param}>
                    <span>Task name</span>
                    <input
                        type="text"
                        className={style.input}
                        name="title"
                        defaultValue={task?.title}
                        required
                    />
                </div>
                <div className={style.param}>
                    <span>Board</span>
                    <select
                        className={style.input}
                        name="categoryId"
                        defaultValue={task?.category?.id}
                        required
                    >
                        {boards.map((board) => (
                            <option key={board.id} value={board.id}>
                                {board.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={style.param}>
                    <span>Due date</span>
                    <input
                        type="date"
                        className={style.input}
                        name="dueDate"
                        defaultValue={task?.dueDate?.toString()}
                    />
                </div>
                <div className={style.param}>
                    <span>Status</span>
                    <select className={style.input} name="status" defaultValue={task?.status}>
                        {statuses.map((status) => (
                            <option key={status}>{status}</option>
                        ))}
                    </select>
                </div>
                <div className={style.param}>
                    <span>Description</span>
                    <textarea
                        className={[style.input, style.textarea].join(' ')}
                        rows={5}
                        maxLength={150}
                        name="description"
                        defaultValue={task?.description}
                        required
                    />
                </div>

                <div className={style.actions}>
                    <button type="reset" className={style.btnSecondary}>
                        Cancel
                    </button>
                    <button type="submit" className={style.btnPrimary}>
                        {type === 'create' ? 'Create' : 'Update'}
                    </button>
                </div>
            </form>
        </>
    )
}
