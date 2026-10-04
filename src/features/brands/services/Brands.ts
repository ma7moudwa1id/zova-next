import { apiClient } from "@/services/apiClient";
import { AxiosRequestConfig } from "axios";

export interface brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

type brandsReturn = {
  data: brand[] ;
  error?: any;
};

export async function getAllBrands(): Promise<brandsReturn> {
  try {
    const options: AxiosRequestConfig = {
      url: "/brands",
      method: "GET",
    };

    const { data } = await apiClient.request(options);

    if (data) {
      return {
        data: data.data,
      };
    }

    return {
      data: [],
    };
  } catch (error) {
    return {
      data: [],
      error,
    };
  }
}
