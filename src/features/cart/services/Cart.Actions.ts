"use server";

import { getToken } from "@/app/(auth)/auth/auth.Actions";
import { apiClient } from "@/services/apiClient";
import { AxiosRequestConfig } from "axios";
import { cartResponseErrorType, cartResponseType } from "../types/CartTypes";

export async function getCartItems(): Promise<
  cartResponseType | cartResponseErrorType
> {
  const token = await getToken();

  if (!token) {
    return {
      status: "fail",
      message: "Please Login",
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v2/cart`,
      method: "GET",
      headers: {
        token: token,
      },
    };

    const { data } = await apiClient.request(options);
    return data;
  } catch (error) {
    return {
      status: "fail",
      message: "something went error",
    };
  }
}

export async function addToCart(
  id: string,
): Promise<cartResponseType | cartResponseErrorType> {
  const token = await getToken();
  if (!token) {
    return {
      status: "fail",
      message: "Please Login",
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v2/cart",
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      data: {
        productId: `${id}`,
      },
    };

    const { data } = await apiClient.request(options);
    return data;
  } catch (error) {
    return {
      status: "fail",
      message: "something went error",
    };
  }
}

export async function removeFromCart(
  id: string,
): Promise<cartResponseType | cartResponseErrorType> {
  const token = await getToken();

  if (!token) {
    return {
      status: "fail",
      message: "Please Login",
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v2/cart/${id}`,
      method: "DELETE",
      headers: {
        token,
      },
    };
    const { data } = await apiClient.request(options);
    return data;
  } catch (error) {
    return {
      status: "fail",
      message: "Please Login",
    };
  }
}

export async function clearCart(): Promise<
  cartResponseType | cartResponseErrorType
> {
  const token = await getToken();

  if (!token) {
    return {
      status: "fail",
      message: "Please Login",
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v2/cart",
      method: "DELETE",
      headers: {
        token,
      },
    };
    const { data } = await apiClient.request(options);
    return data;
  } catch (error) {
    return {
      status: "fail",
      message: "Please Login",
    };
  }
}

export async function updateCart(
  id: string,
  count: number,
): Promise<cartResponseType | cartResponseErrorType> {
  const token = await getToken();

  if (!token) {
    return {
      status: "fail",
      message: "Please Login",
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v2/cart/${id}`,
      method: "PUT",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      data: {
        count: `${count}`,
      },
    };
    const { data } = await apiClient.request(options);
    return data;
  } catch (error) {
    return {
      status: "fail",
      message: "Please Login",
    };
  }
}
