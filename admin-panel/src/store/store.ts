import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authSlice } from "./auth";
import { itemsSlice } from "./items";
import { userItemsSlice } from "./userItems";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    items: itemsSlice.reducer,
    userItems: userItemsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useAuth() {
  return useAppSelector((state) => state.auth);
}
export function useItems() {
  return useAppSelector((state) => state.items);
}
export function useUserItems() {
  return useAppSelector((state) => state.userItems);
}
