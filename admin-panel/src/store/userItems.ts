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
    }).addCase(giveItems.fulfilled, () => {}),
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

export const giveItems = createAsyncThunk(
  "userItems/giveItems",
  async (data: { userId: string; itemId: string; count: number }, thunkApi) => {
    const res = await api.giveItems(data);

    await thunkApi.dispatch(findUserItems(data.userId));

    return { ...res, userId: data.userId };
  }
);

export const deleteItems = createAsyncThunk(
  "userItems/deleteItems",
  async (data: { userId: string; itemId: string; count: number }, thunkApi) => {
    const res = await api.deleteItems(data);

    await thunkApi.dispatch(findUserItems(data.userId));

    return { ...res, userId: data.userId };
  }
);
