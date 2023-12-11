import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../App/appStore.ts";
import { ITask } from "./task.types.ts";

const initialState: { tasks: ITask[] | null } = {
  tasks: null,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<ITask[]>) => {
      state.tasks = action.payload;
    },

    clearTasks: (state) => {
      state.tasks = null;
    },
  },
});

export const { setTasks, clearTasks } = taskSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTasks = (state: RootState) => state.tasks;

export default taskSlice.reducer;
