"use server";

import z from "zod";
import { checkOutSchema, shippingInfoValues } from "../schema/CheckOutSchema";
import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "@/app/(auth)/auth/auth.Actions";
import { apiClient } from "@/services/apiClient";
import { cardApiResponse, cashApiResponse } from "../types/checkOutTypes";

type errorTypes = Partial<Record<keyof shippingInfoValues, string[]>>;

type checkOutActionsReturn =
  | {
      status: "success";
      message: "success";
    }
  | { status: "failed"; message: string; error: errorTypes };

export default async function checkOutActions(
  values: shippingInfoValues,
): Promise<checkOutActionsReturn> {
  const validation = checkOutSchema.safeParse(values);
  if (!validation.success) {
    const { fieldErrors, formErrors } = z.flattenError(validation.error);
    return {
      status: "failed",
      message: formErrors[0] || "failed",
      error: fieldErrors,
    };
  }
  return {
    status: "success",
    message: "success",
  };
}

type cashOrderReturn = {
  data: cashApiResponse | null;
  error?: null | string;
};

type cardOrderReturn = {
  data: cardApiResponse | null;
  error?: null | string;
};
export async function cashOrder(
  id: string,
  values: shippingInfoValues,
): Promise<cashOrderReturn> {
  const token = await getToken();

  if (!token) {
    return {
      data: null,
      error: "Not Authorized",
    };
  }
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/${id}`,
      method: "POST",
      headers: {
        token,
      },
      data: {
        shippingAddress: values,
      },
    };
    const { data } = await axios.request(options);
    return { data };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
    };
  }
}

export async function cardOrder(
  id: string,
  values: shippingInfoValues,
  url: string,
): Promise<cardOrderReturn> {
  const token = await getToken();
  if (!token) {
    return {
      data: null,
      error: "Not Authorized",
    };
  }
  try {
    const options: AxiosRequestConfig = {
      url: `/orders/checkout-session/${id}?url=${url}`,
      method: "POST",
      headers: {
        token,
      },
      data: values,
    };
    const { data } = await apiClient.request(options);
    return { data };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
    };
  }
}
