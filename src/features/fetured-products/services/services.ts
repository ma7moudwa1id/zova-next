import { apiClient } from "@/services/apiClient";
import { AxiosRequestConfig } from "axios";
import { ProductResponse } from "../types/types";

export type getAllProductsReturn = {
  data: ProductResponse[];
  error?: any;
};

export async function getAllProducts(): Promise<getAllProductsReturn> {
  try {
    const options: AxiosRequestConfig = {
      url: "/products",
      method: "GET",
    };

    const { data } = await apiClient.request(options);

    return { data: data.data };
  } catch (error) {
    return {
      data: [],
      error,
    };
  }
}
