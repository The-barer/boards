import { useAppDispatch, useAppSelector } from '@/Shared/Lib/Hooks'

import { selectTasksStatuses } from '@/Entities/Tasks/model/taskSlice'
import { boardsList } from '@/Entities/Boards'

import style from './createTask.module.scss'
import btnStyle from '@/Shared/UI/inputs/button.module.scss'
import { ITaskCreateDTO, TaskStatus, taskApi } from '@/Entities/Tasks'

export type NewTask = {
    title: HTMLInputElement
    description: HTMLInputElement
    status: HTMLSelectElement
    dueDate?: HTMLInputElement
    priorityOrder?: number
    boardId: HTMLSelectElement
}

type CreateTask = {
    onSuccess: () => void
    status?: TaskStatus
    boardId?: string
}

export const CreateTask = ({ onSuccess, boardId, status }: CreateTask) => {
    const statuses = useAppSelector(selectTasksStatuses)
    const boards = useAppSelector(boardsList)

    const dispatch = useAppDispatch()

    const onCreate = async (task: ITaskCreateDTO) => {
        try {
            await dispatch(taskApi.endpoints.createTask.initiate(task)).unwrap()
            onSuccess()
        } catch (e) {
            console.log(e)
        }
    }

    const handelSubmit = (e: React.FormEvent<HTMLFormElement & NewTask>) => {
        e.preventDefault()
        e.stopPropagation()
        const { title, boardId, dueDate, description, status } = e.currentTarget

        const newTask: ITaskCreateDTO = {
            boardId: boardId.value,
            title: title.value,
            dueDate: dueDate?.value ? Date.parse(dueDate?.value) : null,
            description: description?.value,
            status: status.value,
        }

        onCreate({ ...newTask })
    }

    const handelReset = () => {
        onSuccess()
    }

    return (
        <>
            <div className={style.blur} />
            <div className={style.taskItem}>
                <div className={style.taskTitle}>Create task</div>
                <form onSubmit={handelSubmit} onReset={handelReset}>
                    <div className={style.param}>
                        <span>Task name</span>
                        <input type="text" className={style.input} name="title" required />
                    </div>
                    <div className={style.param}>
                        <span>Board</span>
                        <select
                            className={style.input}
                            name="boardId"
                            defaultValue={boardId}
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
                        <input type="date" className={style.input} name="dueDate" />
                    </div>
                    <div className={style.param}>
                        <span>Status</span>
                        <select className={style.input} name="status" defaultValue={status}>
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
                            required
                        />
                    </div>

                    <div className={style.actions}>
                        <button type="reset" className={btnStyle.btnSecondary}>
                            Cancel
                        </button>
                        <button type="submit" className={btnStyle.btnPrimary}>
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
