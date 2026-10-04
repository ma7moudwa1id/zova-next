"use server";

import { apiClient } from "@/services/apiClient";
import { cookies } from "next/headers";
import { UserData } from "../slice/auth.Slice";

export type verifyReturn = {
  isAuthenticated: boolean;
  userData: null | UserData;
};

export async function setToken(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
  });
}

export async function getToken(): Promise<null | string> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return null;
  }
  return token.value;
}

export async function deleteToken() {
  const cookiesStore = await cookies();
  cookiesStore.delete("token");
}
export async function verifyToken(): Promise<verifyReturn> {
  const Token = await getToken();
  if (!Token) {
    return {
      isAuthenticated: false,
      userData: null,
    };
  }
  try {
    const { data } = await apiClient.request({
      url: "/auth/verifyToken",
      method: "GET",
      headers: {
        token: Token,
      },
    });

    if (data.message === "verified") {
      return {
        isAuthenticated: true,
        userData: data.decoded,
      };
    }
    return {
      isAuthenticated: false,
      userData: null,
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      userData: null,
    };
  }
}
