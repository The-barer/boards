import { useParams } from 'react-router-dom'

import { TasksBoard } from '@/Widgets/TasksBoard'
import { TaskModal } from '@/Entities/Tasks/ui/TaskModal'
import { Loader } from '@/Shared/UI'

import style from '@UI/Styles/pagesStyle.module.scss'

export const BoardPage = () => {
    const { boardId } = useParams()

    const renderTasks = () => {
        if (boardId) {
            return (
                <>
                    <TaskModal />
                    <TasksBoard boardId={boardId} />
                </>
            )
        }

        return <Loader />
    }

    return <div className={style.boardPage}>{renderTasks()}</div>
}
