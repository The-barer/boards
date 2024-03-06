import { useGetAllTasksQuery } from '@/Entities/Tasks/api/task.api'
import { selectTasksStatuses } from '@/Entities/Tasks'
import { AddTask } from '@/Features/Task/CreateTask/'
import { StatusBoard } from '@/Features/Boards/StatusBoard'
import { useAppSelector } from '@/Shared/Lib/Hooks'
import { boardsList } from '@/Entities/Boards'
import { BoardSwitch } from '@/Features/Boards'

import style from './tasksBoard.module.scss'

export const TasksBoard = ({ boardId }: { boardId: string }) => {
    const { data, isError, isLoading } = useGetAllTasksQuery(boardId)
    const statuses = useAppSelector(selectTasksStatuses)
    const boards = useAppSelector(boardsList)
    const currentBoard = boards.find((board) => board.id === boardId)

    if (isError || isLoading || !data) {
        return <div className={style.board}>Loading</div>
    }

    return (
        <>
            <BoardSwitch boardID={boardId} />
            <div className={style.board}>
                {currentBoard && (
                    <>
                        <div className={style.boardHeader}>
                            <div className={style.boardTitle}>{currentBoard.title}</div>
                            <div className="actions">
                                <AddTask btnType="bigBlue" task={{ category: currentBoard }} />
                            </div>
                        </div>
                        <div className={style.taskBoard}>
                            {statuses.map((status, i) => (
                                <StatusBoard
                                    key={i}
                                    status={status}
                                    tasks={data}
                                    boardId={currentBoard.id}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
