'use server'
import z from "zod";
import { schema, signUpvalues } from "../schemas/SignUp";
import { apiClient } from "@/services/apiClient";
import { AxiosRequestConfig, isAxiosError } from "axios";
type signUpErrors = Partial<Record<keyof signUpvalues, string[]>>;
type signUpReturn =
  | { success: true; message: string }
  | { success: false; message: string; fieldErrors?: signUpErrors };

export async function signUpActions(
  values: signUpvalues,
): Promise<signUpReturn> {
  const signUpvalidation = schema.safeParse(values);

  if (!signUpvalidation.success) {
    const { fieldErrors, formErrors } = z.flattenError(signUpvalidation.error);
    return {
      success: false,
      message: formErrors[0] || "please fix the errors",
      fieldErrors,
    };
  }

  try {
    const {terms ,...signUpData}=signUpvalidation.data
    const options: AxiosRequestConfig = {
      url: "/auth/signup",
      method: "POST",
      data: signUpData,
    };
    console.log(options.data)

    await apiClient.request(options);

    return {
      success: true,
      message: "Created Account Successfully",
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return { success: false, message: error.response?.data.message };
    }
    return {
      success: false,
      message: "can't reach to server",
    };
  }
}
