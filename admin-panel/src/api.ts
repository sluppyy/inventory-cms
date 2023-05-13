import _axios, { AxiosError } from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const axios = _axios.create({ baseURL });

export type FindAllItemsResponse =
  | {
      code: "ok";
      items: {
        id: string;
        name: string;
        description: string;
        imgUrl?: string | null;
        meta?: string | null;
      }[];
    }
  | { code: "error" };
export async function findAllItems(): Promise<FindAllItemsResponse> {
  try {
    const res = await axios.get("/items");
    return {
      code: "ok",
      items: res.data,
    };
  } catch (e) {
    return { code: "error" };
  }
}

export interface CreateItem {
  name: string;
  description: string;
  imgUrl?: string;
  meta?: string;

  token: string;
}
export type CreateItemResponse =
  | {
      code: "ok";
    }
  | {
      code: "error" | "forbidden";
    };
export async function createItem({
  token,
  ...data
}: CreateItem): Promise<CreateItemResponse> {
  try {
    await axios.post("/items", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { code: "ok" };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 403) {
        return { code: "forbidden" };
      }
    }
    return { code: "error" };
  }
}

export type GetUserItemsResponse =
  | {
      code: "ok";
      items: {
        userId: string;
        itemId: string;
        count: number;
      }[];
    }
  | { code: "error" };
export async function getUserItems(
  userId: string
): Promise<GetUserItemsResponse> {
  try {
    const res = await axios.get(`inventory/${userId}`);
    return {
      code: "ok",
      items: res.data,
    };
  } catch (error) {
    return { code: "error" };
  }
}

export interface GiveItems {
  userId: string;
  itemId: string;
  count: number;
}
export type GiveItemsResponse = { code: "ok" } | { code: "error" };
export async function giveItems(data: GiveItems): Promise<GiveItemsResponse> {
  try {
    await axios.post("/inventory/give-items", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return { code: "ok" };
  } catch (error) {
    return { code: "error" };
  }
}

export interface DeleteItems {
  userId: string;
  itemId: string;
  count: number;
}
export type DeleteItemsResponse = { code: "ok" } | { code: "error" };
export async function deleteItems(
  data: GiveItems
): Promise<DeleteItemsResponse> {
  try {
    await axios.post("/inventory/delete-items", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return { code: "ok" };
  } catch (error) {
    return { code: "error" };
  }
}

export interface UpdateItem {
  id: string;
  name?: string;
  description?: string;
  imgUrl?: string | null;
  meta?: string | null;
}
export type UpdateItemResponse = { code: "ok" } | { code: "error" };
export async function updateItem(
  data: UpdateItem
): Promise<UpdateItemResponse> {
  try {
    await axios.patch("/items", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return { code: "ok" };
  } catch (error) {
    return { code: "error" };
  }
}

export interface DeleteItem {
  id: string;
}
export type DeleteItemResponse = { code: "ok" } | { code: "error" };
export async function deleteItem(
  data: DeleteItem
): Promise<UpdateItemResponse> {
  try {
    await axios.delete("/items", {
      data,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return { code: "ok" };
  } catch (error) {
    return { code: "error" };
  }
}
