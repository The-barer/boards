import { ITask, TaskList, TaskStatus } from '@/Entities/Tasks'
import { AddTask } from '@/Features/Task/CreateTask'
import style from './statusBoard.module.scss'

type StatusBoard = {
    tasks: ITask[]
    status: TaskStatus
    boardId?: string
}

export const StatusBoard = ({ tasks, status, boardId }: StatusBoard) => {
    const filtred = tasks.filter((task) => task.status === status)
    const tasksCount = filtred.length
    return (
        <div className={style.statusBoard}>
            <header className={style.boardHeader}>
                <div className={style.tasksFilter}>
                    <div className={[style.filterChip, style[status]].join(' ')}>{status}</div>
                    <div className={style.tasksCounter}>{tasksCount}</div>
                </div>
                <AddTask boardId={boardId} status={status} />
            </header>
            <TaskList arr={filtred} />
        </div>
    )
}
