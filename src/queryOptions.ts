import axios from "axios";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import type {
  PaginatedResponse,
  BaseProperty,
  ParamsType,
  Property,
} from "@/types";

const server = axios.create({
  baseURL: String(import.meta.env.VITE_BACKEND_URL),
  timeout: 10000,
});

export const propertyQueryOption = (searchFilter: ParamsType = {}) =>
  infiniteQueryOptions({
    queryKey: ["properties", searchFilter],
    queryFn: ({ pageParam }) =>
      server
        .get<PaginatedResponse<BaseProperty>>(
          "/property?" +
            new URLSearchParams({
              page: String(pageParam),
              ...searchFilter,
            }).toString()
        )
        .then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      void lastPage;
      void allPages;
      return lastPageParam++;
    },
  });

export const propertyIdQueryOPtion = (id: number) =>
  queryOptions({
    queryKey: ["property", id],
    queryFn: () =>
      axios.get<Property>(`/property/${String(id)}`).then((res) => res.data),
  });
