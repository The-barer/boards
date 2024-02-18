export {
    tasksSlice,
    selectTasks,
    selectTasksStatuses,
    selectTasksDetailed,
    setDetailedTask,
    clearDetailedTask,
} from './model/taskSlice'
export { TaskSmall } from './ui/TaskSmall'
export { TaskList } from './ui/TaskList'
export { taskApi } from './api/task.api'

export type { ITask, ITaskChangeResponse, ITaskCreateDTO, ITaskUpdateDTO } from './model/taskTypes'
export { TaskStatus } from './model/taskTypes'
