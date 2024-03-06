import { useAppDispatch, useAppSelector } from '@/Shared/Lib/Hooks'
import { clearDetailedTask, selectTaskDetailed } from '..'
import style from './task.module.scss'
import { EditTask } from './editTask'
import { useState } from 'react'
import { TaskFull } from './taskFull'

export const TaskModal = () => {
    const task = useAppSelector(selectTaskDetailed)
    const [editable, setEditable] = useState(false)

    const dispatch = useAppDispatch()

    const closeModal = () => {
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
