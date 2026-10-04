"use server";

import z from "zod";
import { schema, signInValues } from "../schemas/SignIn";
import { AxiosRequestConfig, isAxiosError } from "axios";
import { apiClient } from "@/services/apiClient";

type signInErrors = Partial<Record<keyof signInValues, string[]>>;
type responseReturn = {
  message: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  token: string;
};
type signInReturn =
  | { success: true; message: string; data: responseReturn }
  | {
      success: false;
      message: string;
      fieldErrors?: signInErrors;
    };

export async function SignInActions(
  values: signInValues,
): Promise<signInReturn> {
  const signInValidation = schema.safeParse(values);

  if (!signInValidation.success) {
    const { fieldErrors, formErrors } = z.flattenError(signInValidation.error);
    return {
      success: false,
      message: formErrors[0] || "fix the errors",
      fieldErrors,
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: "/auth/signin",
      method: "POST",
      data: signInValidation.data,
    };

    const { data } = await apiClient.request(options);

    return {
      success: true,
      message: "Welcome Back Again",
      data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data.message,
      };
    }

    return {
      success: false,
      message: "Can't Reach To Server",
    };
  }
}
