import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../App/appStore.ts";
import { ICategory } from "./categories.types.ts";

const initialState: ICategory[] | [] = [];

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state = action.payload;
    },

    clearCategories: () => initialState,
  },
});

export const { setCategories, clearCategories } = categoriesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCategories = (state: RootState) => state.categories;

export default categoriesSlice.reducer;
