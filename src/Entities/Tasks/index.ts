export {
    tasksSlice,
    selectTasks,
    selectTasksStatuses,
    selectTaskDetailed,
    selectTaskDragged,
    setDetailedTask,
    setDraggedTask,
    clearDraggedTask,
    clearDetailedTask,
} from './model/taskSlice'
export { TaskSmall } from './ui/TaskSmall'
export { TaskList } from './ui/TaskList'
export { taskApi } from './api/task.api'

export type {
    ITask,
    ITaskChangeResponse,
    ITaskCreateDTO,
    ITaskUpdateDTO,
    ITaskDetails,
} from './model/taskTypes'
export { TaskStatus } from './model/taskTypes'
