import addIcon from '@/Shared/UI/assets/icons/add_grey.svg'
import style from './createTask.module.scss'
import { useState } from 'react'
import { CreateTask } from '..'
import { useAppDispatch } from '@/Shared/Lib/Hooks'
import { taskApi } from '@/Entities/Tasks/api/task.api'

export const AddTask = () => {
    const [showCreateTask, setShowCreateTask] = useState(false)
    const dispatch = useAppDispatch()

    const close = () => {
        setShowCreateTask(false)
    }
    const toggel = () => {
        setShowCreateTask(!showCreateTask)
    }

    const createTask = (task) => {
        const { boardId, ...newTask } = task
        dispatch(taskApi.endpoints.createTask.initiate({ boardId, newTask }))
    }
    return (
        <>
            <button className={style.addTask} onClick={toggel}>
                <img src={addIcon} alt="add task" />
            </button>
            {showCreateTask && <CreateTask close={close} />}
        </>
    )
}
