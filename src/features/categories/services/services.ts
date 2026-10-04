import { apiClient } from "@/services/apiClient";
import { AxiosRequestConfig } from "axios";

export interface cateory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

type cateoriesReturn = {
  data: cateory[] ;
  error?: any;
};

export async function getAllCategories(): Promise<cateoriesReturn> {
  try {
    const options: AxiosRequestConfig = {
      url: "/categories",
      method: "GET",
    };

    const { data } = await apiClient.request(options);

    if (data) {
      return {
        data: data.data,
      };
    }

    return {
      data: [],
    };
  } catch (error) {
    return {
      data: [],
      error,
    };
  }
}
