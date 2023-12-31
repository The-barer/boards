import { useParams } from 'react-router-dom'

import { TasksBoard } from '@/Widgets/TasksBoard'

import { BoardSwitch } from '@/Features/Boards/BoardSwitch/ui/boardSwitch'

export const BoardPage = () => {
    const { boardId } = useParams()
    if (boardId) {
        return (
            <div style={{ overflow: 'auto' }}>
                <BoardSwitch boardID={boardId} />
                <TasksBoard boardId={boardId} />
            </div>
        )
    }

    return <div className="div">Loading...</div>
}
