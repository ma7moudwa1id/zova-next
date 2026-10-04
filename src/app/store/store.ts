import { cartInitialType, cartReducer } from "@/features/cart/slices/CartSlice";
import { authReducer, InitialStateType } from "./../(auth)/slice/auth.Slice";
import { configureStore } from "@reduxjs/toolkit";
import {
  wishListInital,
  wishListReducer,
} from "@/features/wishlist/slice/WishListSlice";

export type PreloadedState = {
  authReducer: InitialStateType;
  cartReducer: cartInitialType;
  wishListReducer: wishListInital;
};

export function createStore(preloadedState: PreloadedState) {
  const myStore = configureStore({
    reducer: {
      authReducer,
      cartReducer,
      wishListReducer,
    },
    preloadedState,
  });
  return myStore;
}
export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<AppStore["getState"]>;
