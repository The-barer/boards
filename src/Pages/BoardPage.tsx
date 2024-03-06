import { useParams } from 'react-router-dom'

import { TasksBoard, TaskLoader } from '@/Widgets/TasksBoard'
import { TaskModal } from '@/Entities/Tasks/ui/TaskModal'

import style from '@UI/Styles/pagesStyle.module.scss'

export const BoardPage = () => {
    const { boardId, taskId } = useParams()

    const renderTasks = () => {
        if (boardId) {
            return (
                <>
                    <TaskModal />
                    <TasksBoard boardId={boardId} />
                </>
            )
        }

        if (taskId) {
            return <TaskLoader taskId={taskId} />
        }

        return <div className="div">Loading...</div>
    }

    return <div className={style.boardPage}>{renderTasks()}</div>
}
