import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/Shared/Lib/Hooks'

import { clearDetailedTask, selectTaskDetailed, taskApi } from '..'
import { EditTask } from './editTask'
import { TaskFull } from './taskFull'

import style from './task.module.scss'

export const TaskModal = () => {
    const [search, setSearch] = useSearchParams()
    const task = useAppSelector(selectTaskDetailed)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const taskId = search.get('task')
        if (taskId && task?.id !== taskId) {
            dispatch(taskApi.endpoints.getTask.initiate(taskId))
        }
    }, [dispatch, task?.id, search])

    const [editable, setEditable] = useState(false)

    const closeModal = () => {
        setSearch('')
        dispatch(clearDetailedTask())
    }

    const toggleEditMode = () => {
        setEditable(!editable)
    }

    const modalMode = task?.id ? (editable ? 'update' : 'read') : 'create'

    function renderTask() {
        switch (modalMode) {
            case 'create':
                return <EditTask task={task} type="create" onReject={closeModal} />

            case 'update':
                return <EditTask task={task} type="update" onReject={toggleEditMode} />

            case 'read':
                return (
                    task?.id && (
                        <TaskFull task={task} onReject={closeModal} onEdit={toggleEditMode} />
                    )
                )

            default:
                return <div>Error</div>
        }
    }

    if (task === null) {
        return <></>
    }

    return (
        <>
            <div className={style.blur} />
            <div className={style.taskModal}>{renderTask()}</div>
        </>
    )
}
