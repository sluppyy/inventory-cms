import _axios from "axios";

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
