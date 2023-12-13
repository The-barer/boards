import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICategory } from './categoriesTypes.ts'

const initialState: { list: ICategory[] | [] } = { list: [] }

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, { payload }: PayloadAction<ICategory[]>) => {
            state.list = payload
        },

        clearCategories: (state) => {
            state.list = []
        },
    },
})

export const { setCategories, clearCategories } = categoriesSlice.actions

export const selectCategories = (state: RootState) => state

export default categoriesSlice.reducer
