import { createSlice } from "@reduxjs/toolkit";

export type UserData = {
  name: string;
  email?: string;
  role: string;
  id?: string;
  iat?: number;
  exp?: number;
};

export type InitialStateType = {
  isAuthenticated: boolean;
  userData: null | UserData;
};

const initialState: InitialStateType = {
  isAuthenticated: false,
  userData: null,
};
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    authStatus: (
      state,
      action: {
        type: string;
        payload: InitialStateType;
      },
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userData = action.payload.userData;
    },
    logOut: (state) => {
      ((state.isAuthenticated = false), (state.userData = null));
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
