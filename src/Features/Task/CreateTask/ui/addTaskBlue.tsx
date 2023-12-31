/// <reference types="vite-plugin-svgr/client" />

import btn from '@/Shared/UI/inputs/button.module.scss'
import AddIcon from '@/Shared/UI/assets/icons/add.svg?react'
import { useState } from 'react'
import { CreateTask } from '..'

export const AddTaskBlue = () => {
    const [showCreateTask, setShowCreateTask] = useState(false)

    const close = () => {
        setShowCreateTask(false)
    }
    const toggle = () => {
        setShowCreateTask(!showCreateTask)
    }
    return (
        <>
            <button className={btn.addBlue} onClick={toggle}>
                <AddIcon fill="white" />
                <span>Add task</span>
            </button>
            {showCreateTask && <CreateTask close={close} />}
        </>
    )
}
