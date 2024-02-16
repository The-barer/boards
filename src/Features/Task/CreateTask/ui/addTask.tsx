import addIcon from '@/Shared/UI/assets/icons/add_grey.svg'
import style from './createTask.module.scss'
import { useState } from 'react'
import { CreateTask } from '..'

export const AddTask = () => {
    const [showCreateTask, setShowCreateTask] = useState(false)

    const close = () => {
        setShowCreateTask(false)
    }
    const toggle = () => {
        setShowCreateTask(!showCreateTask)
    }

    return (
        <>
            <button className={style.addTask} onClick={toggle}>
                <img src={addIcon} alt="add task" />
            </button>
            {showCreateTask && <CreateTask close={close} />}
        </>
    )
}
