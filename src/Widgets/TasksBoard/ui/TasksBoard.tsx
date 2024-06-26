import { AddTask } from '@/Features/Task/CreateTask/'
import { StatusBoard } from '@/Features/Boards/StatusBoard'
import { BoardSwitch } from '@/Features/Boards'
import { Loader } from '@/Shared/UI'

import { selectTasksStatuses, useGetAllTasksQuery } from '@/Entities/Tasks'
import { boardsList } from '@/Entities/Boards'
import { useAppSelector } from '@/Shared/Lib/Hooks'
import { useTaskFilter } from '../model/useTaskFilter'

import style from './tasksBoard.module.scss'

export const TasksBoard = ({ boardId }: { boardId: string }) => {
    const { data, isError, isLoading } = useGetAllTasksQuery(boardId)
    const statuses = useAppSelector(selectTasksStatuses)
    const boards = useAppSelector(boardsList)

    const currentBoard = boards.find((board) => board.id === boardId)

    const tasks = useTaskFilter(data)

    if (isError || isLoading || !data) {
        return <Loader />
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
                                    tasks={tasks}
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
