import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IBoard } from './boardsTypes.ts'
import { boardsApi } from '../api/boards.api.ts'

const initialState: { list: IBoard[] | []; detailed: IBoard | null; notEmpty: boolean } = {
    list: [],
    detailed: null,
    notEmpty: false,
}

export const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        clearBoards: (state) => {
            state.list = []
            state.detailed = null
            state.notEmpty = false
        },
    },
    extraReducers(builder) {
        builder
            .addMatcher(
                boardsApi.endpoints.createCategory.matchFulfilled,
                (state, { payload }: PayloadAction<IBoard>) => {
                    state.detailed = payload
                    state.notEmpty = true
                },
            )
            .addMatcher(
                boardsApi.endpoints.getDetailedCategory.matchFulfilled,
                (state, { payload }: PayloadAction<IBoard>) => {
                    state.detailed = payload
                    state.notEmpty = true
                },
            )
            .addMatcher(
                boardsApi.endpoints.getAllCategories.matchFulfilled,
                (state, { payload }: PayloadAction<IBoard[]>) => {
                    state.list = payload
                    state.notEmpty = true
                },
            )
            .addMatcher(boardsApi.endpoints.getAllCategories.matchRejected, (state) => {
                state.list = []
                state.notEmpty = false
            })
    },
})

export const { clearBoards } = boardsSlice.actions

export const boardsList = (state: RootState) => state.boards.list
export const boardDetails = (state: RootState) => state.boards.detailed
export const boardsNotEmpty = (state: RootState) => state.boards.notEmpty

export default boardsSlice.reducer
