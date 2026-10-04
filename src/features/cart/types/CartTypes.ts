export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface cartProduct {
  subcategory: Subcategory[];
  _id: string;
  title: string;
  slug: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

export interface CartItemType {
  count: number;
  _id: string;
  product: cartProduct;
  price: number;
}

export interface CartData {
  _id?: string;
  cartOwner?: string;
  products: CartItemType[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  totalCartPrice: number;
}

export interface cartResponseType {
  status: "success";
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

export type cartResponseErrorType = {
  status: "fail";
  message: string;
};