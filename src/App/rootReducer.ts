import { combineReducers } from "@reduxjs/toolkit";

import { userSlice } from "../Entities/User";
import { sessionSlice } from "../Entities/Session";
import { baseApi } from "../Shared/Api";

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [sessionSlice.name]: sessionSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
