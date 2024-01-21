import { DraggableList } from '@/Shared/UI'
import { useAppDispatch, useAppSelector } from '@/Shared/Lib/Hooks'
import {
    ITask,
    TaskSmall,
    clearDetailedTask,
    selectTasksDetailed,
    setDetailedTask,
    taskApi,
} from '..'

import style from './task.module.scss'

export const TaskList = ({ arr, status }: { arr: ITask[]; status: string }) => {
    const dispatch = useAppDispatch()
    const dragged = useAppSelector(selectTasksDetailed)
    const updateTask = async (item: ITask, newOrder: number, newStatus: string) => {
        if (item.priorityOrder !== newOrder || item.status !== newStatus) {
            try {
                await dispatch(
                    taskApi.endpoints.updateTask.initiate({
                        id: item.id,
                        priorityOrder: newOrder,
                        status: newStatus,
                    }),
                ).unwrap()
            } catch (error) {
                console.log(error)
            }
        }
    }

    const dragHandlers = {
        onDragStart: (e: React.DragEvent<HTMLDivElement>, item: ITask) => {
            e.stopPropagation()
            dispatch(setDetailedTask(item))
        },
        onDrop: (e: React.DragEvent<HTMLDivElement>, item: ITask, i: number) => {
            e.preventDefault()
            if (dragged) {
                const newArr = arr.filter((task) => task.id !== dragged.id)
                newArr.splice(i, 0, dragged)
                newArr.forEach((task, index) => updateTask(task, index, item.status))
            }
        },
        onDragEnd: (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault()
            dispatch(clearDetailedTask())
        },
    }

    if (arr.length === 0) {
        return (
            <div
                className={style.taskItem}
                onDrop={() => dragged && updateTask(dragged, arr.length, status)}
                onDragOver={(e) => {
                    e.preventDefault()
                }}
            ></div>
        )
    }

    return (
        <div className={style.taskList}>
            <DraggableList
                arr={arr.sort((a, b) => a.priorityOrder - b.priorityOrder)}
                renderElement={(props) => <TaskSmall {...props} key={props.id} />}
                dragHandlers={dragHandlers}
            />
        </div>
    )
}
