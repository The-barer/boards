import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IUserResponse } from "../../Types/types";
import { removeTokenFromLocalStorage } from "../../Helpers/localStorage.helper";
import { authService } from "../../Services/auth.service";

interface UserState {
  user: IUserResponse | null;
  isAuth: boolean;
}

const initialState: UserState = {
  user: null,
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUserResponse>) => {
      state.user = action.payload;
      state.isAuth = true;
    },

    logout: (state) => {
      authService.logout();
      state.user = null;
      state.isAuth = false;
      removeTokenFromLocalStorage();
    },
  },
});

export const { login, logout } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user;

export default userSlice.reducer;
