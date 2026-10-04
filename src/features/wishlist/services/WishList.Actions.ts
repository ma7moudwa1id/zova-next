"use server";

import { getToken } from "@/app/(auth)/auth/auth.Actions";
import { apiClient } from "@/services/apiClient";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
  wishListApiErrorResponse,
  wishListApiResponse,
} from "../types/Wishlist.Types";

export type getWishListReturn =
  | {
      status: "success";
      data: wishListApiResponse;
    }
  | {
      status: "fail";
      data: null;
    };

export async function getWishList(): Promise<getWishListReturn> {
  const token = await getToken();

  if (!token) {
    return {
      status: "fail",
      data: null,
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: "/wishlist",
      method: "GET",
      headers: {
        token,
      },
    };
    const { data } = await apiClient.request(options);
    return {
      status: "success",
      data,
    };
  } catch (error) {
    return {
      status: "fail",
      data: null,
    };
  }
}

export async function addToWishList(id: string): Promise<getWishListReturn> {
  const token = await getToken();

  if (!token) {
    return {
      status: "fail",
      data: null,
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: "/wishlist",
      method: "POST",
      headers: {
        token,
      },
      data: {
        productId: id,
      },
    };
    const { data } = await apiClient.request(options);

    return {
      status: "success",
      data,
    };
  } catch (error) {
    return {
      status: "fail",
      data: null,
    };
  }
}

export async function removeFromWishList(
  id: string,
): Promise<getWishListReturn> {
  const token = await getToken();

  if (!token) {
    return {
      status: "fail",
      data: null,
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      method: "DELETE",
      headers: {
        token,
      },
    };
    const { data } = await apiClient.request(options);

    return {
      status: "success",
      data,
    };
  } catch (error) {
    return {
      status: "fail",
      data: null,
    };
  }
}
