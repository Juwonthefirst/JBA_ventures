export interface ParamsType {
  [key: string]: string;
}

export interface BaseProperty {
  main_image: string;
  description: string;
  state: string;
  lga: string;
  price: number;
  offer: "Sale" | "Lease" | "Rent";
  tags: string;
  id: number;
}

export interface Property extends BaseProperty {
  address: string;
  benefits: string[];
  type: "House" | "Shop" | "Land";
  extra_media: string[];
}

export interface PaginatedBasePropertyResponse {
  count: number;
  next: string;
  prev: string;
  results: BaseProperty[];
}

export interface AuthStateType {
  authToken: string | undefined;
  error: number | undefined;
  fetchType: undefined | "login" | "initial";
  isAuthenticated: boolean;
}

export interface TagType {
  [key: string]: string;
}

export type AdminContext = {
  authToken: string;
};

export interface PropertyFormInputs {
  main_image: File;
  extra_media: File[];
  description: string;
  benefits: string[];
  address: string;
  state: string;
  lga: string;
  tags: TagType;
  price: number;
  type: "House" | "Shop" | "Land";
  offer: "Sale" | "Lease" | "Rent";
}

export type FormDataValues =
  | string
  | Blob
  | Blob[]
  | string[]
  | number
  | number[]
  | { [key: string]: unknown };

export type ServerError = Record<keyof PropertyFormInputs, string[]>;
