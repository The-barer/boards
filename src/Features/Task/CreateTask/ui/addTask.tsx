import addIcon from '@/Shared/UI/assets/icons/add_grey.svg'
import style from './createTask.module.scss'
import { useState } from 'react'
import { CreateTask } from '..'
import { useAppDispatch } from '@/Shared/Lib/Hooks'
import { taskApi } from '@/Entities/Tasks/api/task.api'
import { ITaskCreateDTO } from '@/Entities/Tasks'

export const AddTask = () => {
    const [showCreateTask, setShowCreateTask] = useState(false)
    const dispatch = useAppDispatch()

    const close = () => {
        setShowCreateTask(false)
    }
    const toggle = () => {
        setShowCreateTask(!showCreateTask)
    }

    const createTask = async (task: ITaskCreateDTO) => {
        try {
            console.log(task)
            await dispatch(taskApi.endpoints.createTask.initiate(task)).unwrap()
            return close()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <button className={style.addTask} onClick={toggle}>
                <img src={addIcon} alt="add task" />
            </button>
            {showCreateTask && <CreateTask close={close} onCreate={createTask} />}
        </>
    )
}
