import { selectTasksStatuses } from '@/Entities/Tasks'
import { StatusBoard } from '@/Features/Boards/StatusBoard'
import { useAppSelector } from '@/Shared/Lib/Hooks'
import style from './tasksBoard.module.scss'
import { useGetAllTasksQuery } from '@/Entities/Tasks/api/task.api'

export const TasksBoard = ({ boardId }: { boardId: string }) => {
    const { data, isError, isLoading } = useGetAllTasksQuery(boardId)
    const statuses = useAppSelector(selectTasksStatuses)

    if (isError || isLoading || !data) {
        return <div className={style.board}>Loading</div>
    }

    return (
        <div className={style.board}>
            {statuses.map((status, i) => (
                <StatusBoard key={i} status={status} tasks={data} />
            ))}
        </div>
    )
}
