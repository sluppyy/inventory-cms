import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserItems } from "../models";
import * as api from "../api";

const initialState: {
  items: {
    [key: string]: UserItems[] | undefined;
  };
  current?: string;
} = {
  items: {},
};

export const userItemsSlice = createSlice({
  name: "userItems",
  initialState,
  reducers: {
    CURRENT(state, { payload }: PayloadAction<string>) {
      state.current = payload;
    },
  },
  extraReducers: ($) =>
    $.addCase(findUserItems.fulfilled, (state, res) => {
      state.items[res.payload.userId] = res.payload.items;
    }),
});

export const { CURRENT } = userItemsSlice.actions;

export const findUserItems = createAsyncThunk(
  "userItems/findUserItems",
  async (userId: string) => {
    const res = await api.getUserItems(userId);

    if (res.code === "ok") {
      return {
        code: "ok",
        items: res.items.map(({ count, itemId, userId }) => ({
          count,
          itemId,
          userId,
        })),
        userId,
      };
    }

    return { ...res, userId };
  }
);
