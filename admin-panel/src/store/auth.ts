import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "./store";

const initialState: {
  token?: string;
} = {
  token: localStorage.getItem("token") ?? undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET(state, action: PayloadAction<string>) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
  },
});
export const { SET } = authSlice.actions;
