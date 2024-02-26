import { ITaskDetails, setDetailedTask } from '@/Entities/Tasks'
import { useAppDispatch } from '@/Shared/Lib/Hooks'

import AddIconGrey from '@/Shared/UI/assets/icons/add_grey.svg?react'
import AddIcon from '@/Shared/UI/assets/icons/add.svg?react'

import style from './addTask.module.scss'

type AddTask = {
    btnType?: 'small' | 'bigBlue'
    task: ITaskDetails
}
export const AddTask = ({ btnType = 'small', task }: AddTask) => {
    const dispatch = useAppDispatch()

    const setTask = () => {
        dispatch(setDetailedTask(task))
    }

    const renderButton = () => {
        if (btnType == 'bigBlue') {
            return (
                <button className={style.addBtnBlue} onClick={setTask}>
                    <AddIcon fill="white" />
                    <span>Add task</span>
                </button>
            )
        }

        return (
            <button className={style.addBtnGrey} onClick={setTask}>
                <AddIconGrey />
            </button>
        )
    }

    return renderButton()
}
