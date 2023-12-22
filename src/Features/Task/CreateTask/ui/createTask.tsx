import { useAppSelector } from '@/Shared/Lib/Hooks'

import { tasksStatuses } from '@/Entities/Tasks/model/taskSlice'
import { boardsList } from '@/Entities/Boards'

import style from './createTask.module.scss'
import btnStyle from '@/Shared/UI/inputs/button.module.scss'

export const CreateTask = () => {
    const statuses = useAppSelector(tasksStatuses)
    const boards = useAppSelector(boardsList)

    return (
        <>
            <div className={style.blur} />
            <div className={style.taskItem}>
                <div className={style.taskTitle}>Create task</div>
                <div className={style.param}>
                    <span>Task name</span>
                    <input type="text" className={style.input} />
                </div>
                <div className={style.param}>
                    <span>Board</span>
                    <select className={style.input}>
                        {boards.map((board) => (
                            <option value={board.id}>{board.title}</option>
                        ))}
                    </select>
                </div>
                <div className={style.param}>
                    <span>Due date</span>
                    <input type="date" className={style.input} />
                </div>
                <div className={style.param}>
                    <span>Status</span>
                    <select className={style.input}>
                        {statuses.map((status) => (
                            <option>{status}</option>
                        ))}
                    </select>
                </div>
                <div className={style.param}>
                    <span>Description</span>
                    <textarea className={style.input} rows={5} />
                </div>

                <div className={style.actions}>
                    <button className={btnStyle.btnSecondary}>Cancel</button>
                    <button className={btnStyle.btnPrimary}>Create</button>
                </div>
            </div>
        </>
    )
}
