import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IUserAuthResponse } from "../../Types/types";
import {
  getAccessTokenFromLocalStorage,
  removeTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
} from "../../Helpers/localStorage.helper";

interface UserState {
  user: IUserAuthResponse | null;
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
    login: (state, action: PayloadAction<IUserAuthResponse>) => {
      state.user = action.payload;
      state.isAuth = true;

      !getAccessTokenFromLocalStorage() &&
        setAccessTokenToLocalStorage(action.payload.token);
    },

    logout: (state) => {
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
