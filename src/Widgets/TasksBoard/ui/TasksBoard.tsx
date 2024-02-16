import { selectTasksStatuses } from '@/Entities/Tasks'
import { StatusBoard } from '@/Features/Boards/StatusBoard'
import { useAppSelector } from '@/Shared/Lib/Hooks'
import { boardsList } from '@/Entities/Boards'
import style from './tasksBoard.module.scss'

import { useGetAllTasksQuery } from '@/Entities/Tasks/api/task.api'
import { AddTaskBlue } from '@/Features/Task/CreateTask/ui/addTaskBlue'

export const TasksBoard = ({ boardId }: { boardId: string }) => {
    const { data, isError, isLoading } = useGetAllTasksQuery(boardId)
    const statuses = useAppSelector(selectTasksStatuses)
    const boards = useAppSelector(boardsList)
    const currentBoard = boards.find((board) => board.id === boardId)

    if (isError || isLoading || !data) {
        return <div className={style.board}>Loading</div>
    }

    return (
        <div className={style.board}>
            {currentBoard && (
                <div className={style.boardHeader}>
                    <div className={style.boardTitle}>{currentBoard.title}</div>
                    <div className="actions">
                        <AddTaskBlue />
                    </div>
                </div>
            )}
            <div className={style.taskBoard}>
                {statuses.map((status, i) => (
                    <StatusBoard key={i} status={status} tasks={data} />
                ))}
            </div>
        </div>
    )
}
