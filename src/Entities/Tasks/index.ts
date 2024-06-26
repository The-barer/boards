export {
    tasksSlice,
    selectTasks,
    selectTasksStatuses,
    selectTaskDetailed,
    selectTaskDragged,
    selectTaskFilter,
    setDetailedTask,
    setDraggedTask,
    setTaskFilter,
    clearDraggedTask,
    clearDetailedTask,
    clearTaskFilter,
} from './model/taskSlice'
export { TaskSmall } from './ui/TaskSmall'
export { TaskList } from './ui/TaskList'
export { taskApi, useGetAllTasksQuery } from './api/task.api'

export type {
    ITask,
    ITag,
    ITaskFilter,
    ITaskChangeResponse,
    ITaskCreateDTO,
    ITaskUpdateDTO,
    ITaskDetails,
} from './model/taskTypes'
export { TaskStatus } from './model/taskTypes'
