import { ITask, selectTasksStatuses } from '@/Entities/Tasks'
import { StatusBoard } from '@/Features/Boards/StatusBoard'
import { useAppSelector } from '@/Shared/Lib/Hooks'
import style from './tasksBoard.module.scss'
import { useGetAllTasksQuery } from '@/Entities/Tasks/api/task.api'
import { useEffect, useState } from 'react'

export const TasksBoard = ({ boardId }: { boardId: string }) => {
    const { data, isError, isLoading } = useGetAllTasksQuery(boardId)
    const statuses = useAppSelector(selectTasksStatuses)
    const [tasks, setTasks] = useState<ITask[]>([])

    useEffect(() => {
        if (!isError && !isLoading && data) {
            console.log('DATA RECIVED', data)
            setTasks(data)
        }
    }, [data, isError, isLoading])

    if (tasks) {
        return (
            <div className={style.board}>
                {statuses.map((status) => (
                    <StatusBoard key={status} status={status} tasks={tasks} />
                ))}
            </div>
        )
    }
    return <div className={style.board}>Loading</div>
}
