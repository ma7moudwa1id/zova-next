"use server";

import { getToken } from "@/app/(auth)/auth/auth.Actions";
import { apiClient } from "@/services/apiClient";
import { AxiosRequestConfig } from "axios";
import { OrdersApiResponse } from "../types/OrderTypes";



export default async function getAllOrders(
  id: string,
): Promise<OrdersApiResponse> {
  const token = await getToken();
  if (!id || !token) {
    throw new Error("Not Authorization");
  }
  try {
    const options: AxiosRequestConfig = {
      url: `/orders/user/${id}`,
      method: "GET",
      headers: {
        token,
      },
    };
    const { data } = await apiClient(options);
    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: "Failed To Get Your Orders",
    };
  }
}
