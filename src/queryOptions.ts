import {
  infiniteQueryOptions,
  queryOptions,
  skipToken,
} from "@tanstack/react-query";
import type {
  PaginatedResponse,
  BaseProperty,
  ParamsType,
  Property,
} from "@/types";
import { api } from "@/api-client";

export const propertyQueryOption = (searchFilter: ParamsType) =>
  infiniteQueryOptions({
    queryKey: ["properties", searchFilter],
    queryFn: ({ pageParam }) =>
      api
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
      void allPages;
      return lastPage.next ? lastPageParam++ : undefined;
    },
  });

export const propertyIdQueryOPtion = (id: string) =>
  queryOptions({
    queryKey: ["property", id],
    queryFn: () => api.get<Property>(`/property/${id}`).then((res) => res.data),
  });

export const csrfOption = queryOptions({
  queryKey: ["csrf"],
  queryFn: () =>
    api.get<{ csrf: string }>("/auth/csrf").then((res) => res.data),
  staleTime: Infinity,
});

export const accessTokenOption = (csrf: string | undefined) =>
  queryOptions({
    queryKey: ["accessToken"],
    queryFn: csrf
      ? () =>
          api
            .post<{ access: string }>("/auth/token/refresh/", {
              headers: {
                "X-CSRFTOKEN": csrf,
              },
            })
            .then((res) => res.data)
      : skipToken,
    refetchInterval: 30 * 60 * 1000, // refetch access token every 30 minutes
    staleTime: Infinity,
  });
