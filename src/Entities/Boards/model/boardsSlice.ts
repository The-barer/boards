import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { IBoard } from './boardsTypes.ts'
import { boardsApi } from '../api/boards.api.ts'

type BoardState = {
    list: IBoard[]
    detailed: IBoard | null
}

const initialState: BoardState = {
    list: [],
    detailed: null,
}

function updateDetailed(state: BoardState, { payload }: PayloadAction<IBoard>) {
    state.detailed = payload
}

function updateList(state: BoardState, list: IBoard[]) {
    state.list = list
}

export const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        clearBoards: (state) => {
            state.list = []
            state.detailed = null
        },
    },
    extraReducers(builder) {
        builder
            .addMatcher(boardsApi.endpoints.createCategory.matchFulfilled, updateDetailed)
            .addMatcher(boardsApi.endpoints.getDetailedCategory.matchFulfilled, updateDetailed)
            .addMatcher(
                boardsApi.endpoints.getAllCategories.matchFulfilled,
                (state, { payload }: PayloadAction<IBoard[]>) => updateList(state, payload),
            )
            .addMatcher(boardsApi.endpoints.getAllCategories.matchRejected, (state) =>
                updateList(state, []),
            )
    },
})

export const { clearBoards } = boardsSlice.actions

export const boardsList = (state: RootState) => state.boards.list
export const boardDetails = (state: RootState) => state.boards.detailed
export const boardsIsEmpty = (state: RootState) => !!state.boards.list.length

export default boardsSlice.reducer
