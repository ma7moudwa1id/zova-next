import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { wishListApiResponse } from "../types/Wishlist.Types";
import { string } from "zod";

export type wishListInital = {
  status: string;
  data: wishListApiResponse;
};

const initialState: wishListInital = {
  status: "",
  data: { count: 0, data: [], status: "" },
};

const wishListSlice = createSlice({
  name: "wishListSlice",
  initialState,
  reducers: {
    withStatus: function (state, action: PayloadAction<wishListInital>) {
      return action.payload;
    },
    clearWish: function (state) {
      state.status = "fail";
      state.data = { count: 0, data: [], status: "fail" };
    },
  },
});

export const wishListReducer = wishListSlice.reducer;
export const wishListActions = wishListSlice.actions;
