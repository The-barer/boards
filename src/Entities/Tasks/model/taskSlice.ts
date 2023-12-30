import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ITask, TaskStatus } from './taskTypes.ts'
import { taskApi } from '../api/task.api.ts'

const initialState: {
    list: ITask[] | []
    detailed: ITask | null
    notEmpty: boolean
    defaultStatuses: TaskStatus[]
} = {
    list: [],
    detailed: null,
    notEmpty: false,
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
            state.notEmpty = false
        },
    },
    extraReducers(builder) {
        builder
            .addMatcher(
                taskApi.endpoints.createTask.matchFulfilled,
                (state, { payload }: PayloadAction<ITask>) => {
                    state.detailed = payload
                    state.notEmpty = true
                },
            )
            .addMatcher(
                taskApi.endpoints.getTask.matchFulfilled,
                (state, { payload }: PayloadAction<ITask>) => {
                    state.detailed = payload
                    state.notEmpty = true
                },
            )
            .addMatcher(
                taskApi.endpoints.getAllTasks.matchFulfilled,
                (state, { payload }: PayloadAction<ITask[]>) => {
                    state.list = payload
                    state.notEmpty = true
                },
            )
            .addMatcher(taskApi.endpoints.getAllTasks.matchRejected, (state) => {
                state.list = []
                state.notEmpty = false
            })
    },
})

export const { clearTasks } = tasksSlice.actions

export const selectTasks = (state: RootState) => state.tasks.list
export const selectTasksDetails = (state: RootState) => state.tasks.detailed
export const selectTasksNotEmpty = (state: RootState) => state.tasks.notEmpty
export const selectTasksStatuses = (state: RootState) => state.tasks.defaultStatuses

export default tasksSlice.reducer
