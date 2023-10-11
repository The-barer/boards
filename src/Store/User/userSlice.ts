import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IUserAuthResponse, IUserResponse } from "../../Types/types";
import {
  getAccessTokenFromLocalStorage,
  removeTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
} from "../../Helpers/localStorage.helper";
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
    login: (state, action: PayloadAction<IUserAuthResponse>) => {
      state.user = action.payload.user;
      state.isAuth = true;

      !getAccessTokenFromLocalStorage() &&
        setAccessTokenToLocalStorage(action.payload.accessToken);
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
