"use server";

import { getAllProductsReturn } from "@/features/fetured-products/services/services";
import { apiClient } from "@/services/apiClient";
import { AxiosRequestConfig } from "axios";

export async function getProductsByCategory(
  id: string,
): Promise<getAllProductsReturn> {
  
  try {
    const options: AxiosRequestConfig = {
      url: `/products?category=${id}`,
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
