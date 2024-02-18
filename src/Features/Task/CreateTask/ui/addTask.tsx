import AddIconGrey from '@/Shared/UI/assets/icons/add_grey.svg?react'
import AddIcon from '@/Shared/UI/assets/icons/add.svg?react'
import style from './createTask.module.scss'
import btn from '@/Shared/UI/inputs/button.module.scss'
import { useState } from 'react'
import { CreateTask } from '..'
import { TaskStatus } from '@/Entities/Tasks'

type AddTask = {
    btnType?: 'small' | 'bigBlue'
    status?: TaskStatus
    boardId?: string
}
export const AddTask = ({ btnType = 'small', boardId, status }: AddTask) => {
    const [showCreateTask, setShowCreateTask] = useState(false)

    const close = () => {
        setShowCreateTask(false)
    }
    const toggle = () => {
        setShowCreateTask(!showCreateTask)
    }

    let addButton = (
        <button className={style.addTask} onClick={toggle}>
            <AddIconGrey />
        </button>
    )

    if (btnType == 'bigBlue') {
        addButton = (
            <button className={btn.addBlue} onClick={toggle}>
                <AddIcon fill="white" />
                <span>Add task</span>
            </button>
        )
    }

    return (
        <>
            {addButton}
            {showCreateTask && <CreateTask onSuccess={close} status={status} boardId={boardId} />}
        </>
    )
}
