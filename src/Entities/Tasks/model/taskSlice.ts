import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ITag, ITask, ITaskDetails, ITaskFilter, TaskStatus } from './taskTypes.ts'
import { taskApi } from '../api/task.api.ts'

const initialState: {
    list: ITask[] | []
    tags: ITag[] | []
    filter: ITaskFilter | null
    dragged: ITask | null
    detailed: ITaskDetails | null
    defaultStatuses: TaskStatus[]
} = {
    list: [],
    tags: [],
    filter: null,
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
        setTaskFilter: (state, { payload }: PayloadAction<ITaskFilter>) => {
            state.filter = payload
        },
        clearTaskFilter: (state) => {
            state.filter = null
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

export const {
    clearTasks,
    setDetailedTask,
    clearDetailedTask,
    clearDraggedTask,
    setDraggedTask,
    setTaskFilter,
    clearTaskFilter,
} = tasksSlice.actions

export const selectTasks = (state: RootState) => state.tasks.list
export const selectTasksStatuses = (state: RootState) => state.tasks.defaultStatuses
export const selectTaskDetailed = (state: RootState) => state.tasks.detailed
export const selectTaskDragged = (state: RootState) => state.tasks.dragged
export const selectTaskFilter = (state: RootState) => state.tasks.filter

export default tasksSlice.reducer
