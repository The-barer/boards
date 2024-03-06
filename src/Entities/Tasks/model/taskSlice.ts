import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ITask, ITaskDetails, TaskStatus } from './taskTypes.ts'
import { taskApi } from '../api/task.api.ts'

const initialState: {
    list: ITask[] | []
    dragged: ITask | null
    detailed: ITaskDetails | null
    defaultStatuses: TaskStatus[]
} = {
    list: [],
    dragged: null,
    detailed: null,
    defaultStatuses: [
        TaskStatus.BACKLOG,
        TaskStatus.TODO,
        TaskStatus.INPROGRESS,
        TaskStatus.REVIEW,
        TaskStatus.DONE,
    ],
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        clearTasks: (state) => {
            state.list = []
            state.detailed = null
        },
        setDraggedTask: (state, { payload }: PayloadAction<ITask>) => {
            state.dragged = payload
        },
        clearDraggedTask: (state) => {
            state.dragged = null
        },
        setDetailedTask: (state, { payload }: PayloadAction<ITaskDetails>) => {
            state.detailed = payload
        },
        clearDetailedTask: (state) => {
            state.detailed = null
        },
    },
    extraReducers(builder) {
        builder
            .addMatcher(
                taskApi.endpoints.createTask.matchFulfilled,
                (state, { payload }: PayloadAction<ITask>) => {
                    state.detailed = payload
                },
            )
            .addMatcher(
                taskApi.endpoints.getTask.matchFulfilled,
                (state, { payload }: PayloadAction<ITask>) => {
                    state.detailed = payload
                },
            )
            .addMatcher(
                taskApi.endpoints.getAllTasks.matchFulfilled,
                (state, { payload }: PayloadAction<ITask[]>) => {
                    state.list = payload
                },
            )
            .addMatcher(taskApi.endpoints.getAllTasks.matchRejected, (state) => {
                state.list = []
            })
    },
})

export const { clearTasks, setDetailedTask, clearDetailedTask, clearDraggedTask, setDraggedTask } =
    tasksSlice.actions

export const selectTasks = (state: RootState) => state.tasks.list
export const selectTasksStatuses = (state: RootState) => state.tasks.defaultStatuses
export const selectTaskDetailed = (state: RootState) => state.tasks.detailed
export const selectTaskDragged = (state: RootState) => state.tasks.dragged

export default tasksSlice.reducer
