import { useGetTaskQuery } from '@/Entities/Tasks/api/task.api'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const TaskLoader = ({ taskId }: { taskId: string }) => {
    const navigate = useNavigate()
    const { data, error, isLoading } = useGetTaskQuery(taskId)

    useEffect(() => {
        if (data) {
            const boardId = data?.category?.id
            boardId && navigate('/board/' + boardId)
        }
    }, [data, navigate])

    return (
        <>
            {isLoading && <div>Loding task data...</div>}
            {error && <div>Error loading task...</div>}
        </>
    )
}
