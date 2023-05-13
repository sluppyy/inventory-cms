import _axios, { AxiosError } from "axios";

//import.meta.env.BASE_URL
const baseURL = "http://localhost:3000/";
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
