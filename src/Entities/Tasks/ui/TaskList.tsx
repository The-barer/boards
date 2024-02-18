import { DraggableList } from '@/Shared/UI'
import { ITask, TaskSmall } from '..'
import { useAppDispatch } from '@/Shared/Lib/Hooks'
import { taskApi } from '../api/task.api'
import style from './task.module.scss'

export const TaskList = ({ arr }: { arr: ITask[] }) => {
    const dispatch = useAppDispatch()
    const updateTaskOrder = async (item: ITask, newOrder: number) => {
        if (item.priorityOrder !== newOrder) {
            try {
                await dispatch(
                    taskApi.endpoints.updateTask.initiate({ id: item.id, priorityOrder: newOrder }),
                ).unwrap()
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className={style.taskList}>
            <DraggableList
                arr={arr}
                updateFn={updateTaskOrder}
                renderElement={(props) => <TaskSmall {...props} key={props.id} />}
            />
        </div>
    )
}
