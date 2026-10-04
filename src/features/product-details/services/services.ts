import { apiClient } from "@/services/apiClient";
import { AxiosRequestConfig } from "axios";
import { errorType, Product } from "../types/types";
type data = {
  data: Product;
};
export type getSpecificProductReturn =
  | {
      success: true;
      data: data;
    }
  | { success: false; data: null; error: errorType };

export async function getSpecificProduct(
  id: string,
): Promise<getSpecificProductReturn> {
  try {
    const options: AxiosRequestConfig = {
      url: `/products/${id}`,
      method: "GET",
    };
    const { data } = await apiClient.request(options);

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error as errorType,
    };
  }
}
