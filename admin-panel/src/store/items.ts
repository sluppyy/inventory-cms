import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Item } from "../models";
import * as api from "../api";

const initialState: {
  items: Item[] | null;
  status: "unknown" | "process" | "ok" | "error";
} = {
  items: null,
  status: "unknown",
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: ($) =>
    $.addCase(findAllItems.pending, (state) => {
      state.status = "process";
    })
      .addCase(findAllItems.rejected, (state) => {
        state.status = "error";
      })
      .addCase(findAllItems.fulfilled, (state, action) => {
        if (action.payload.code === "ok") {
          state.items = action.payload.items;
          state.status = "ok";
        } else {
          state.items = null;
          state.status = "error";
        }
      }),
});

export const {} = itemsSlice.reducer;

export const findAllItems = createAsyncThunk("items/findAllItems", async () => {
  const res = await api.findAllItems();

  if (res.code != "ok") return res;
  return {
    code: "ok",
    items: res.items.map((_) => ({
      id: _.id,
      name: _.name,
      description: _.description,
      imgUrl: _.imgUrl ?? undefined,
      meta: _.meta ?? undefined,
    })),
  } as const;
});

interface Create {
  name: string;
  description: string;
  imgUrl?: string;
  meta?: string;
}

export const createItem = createAsyncThunk(
  "items/createItem",
  async (dto: Create, thunkApi) => {
    const res = await api.createItem({
      ...dto,
      token: localStorage.getItem("token") ?? "",
    });

    if (res.code === "ok") {
      await thunkApi.dispatch(findAllItems());
    }

    return res;
  }
);
