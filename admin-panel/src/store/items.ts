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
      })
      .addCase(updateItem.fulfilled, () => {})
      .addCase(deleteItem.fulfilled, () => {}),
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

export interface UpdateItem {
  id: string;
  name?: string;
  description?: string;
  imgUrl?: string | null;
  meta?: string | null;
}
export const updateItem = createAsyncThunk(
  "items/updateItem",
  async (dto: UpdateItem, thunkApi) => {
    const res = await api.updateItem(dto);

    if (res.code === "ok") {
      await thunkApi.dispatch(findAllItems());
    }

    return res;
  }
);

export interface Delete {
  id: string;
}
export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async (dto: Delete, thunkApi) => {
    const res = await api.deleteItem(dto);

    if (res.code === "ok") {
      await thunkApi.dispatch(findAllItems());
    }

    return res;
  }
);
