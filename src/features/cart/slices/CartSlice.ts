import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType } from "../types/CartTypes";

export type cartInitialType = {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: {
    totalCartPrice: number;
    products: CartItemType[];
  };
};

const initialCartState: cartInitialType = {
  status: "",
  message: "",
  numOfCartItems: 0,
  cartId: "",
  data: {
    totalCartPrice: 0,
    products: [],
  },
};

const cartSlice = createSlice({
  name: "cartslice",
  initialState: initialCartState,
  reducers: {
    cartStatus: function (state, action: PayloadAction<cartInitialType>) {
      return action.payload;
    },
    logOutCart: function (state, action: PayloadAction) {
      state.status = "fail";
      state.numOfCartItems = 0;
    },
    cartClear: function (state) {
      state.data.products = [];
      state.data.totalCartPrice = 0;
      state.numOfCartItems = 0;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
