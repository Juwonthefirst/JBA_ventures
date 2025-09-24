import { useState, useEffect, useRef } from "react";
import type { PaginatedResponse, ParamsType } from "../types.ts";
import { fetchJSON } from "@/helper.ts";

interface StateType<Type> {
  data: Type[];
  error: { status: number; message: string } | null;
  isLoading: boolean;
}

interface ReturnType<Type> extends StateType<Type> {
  hasEnded: boolean;
  retry: () => void;
}

const usePaginatedFetch = function <Type>(
  url: string,
  page = 1,
  params?: ParamsType
): ReturnType<Type> {
  const [hasEnded, setHasEnded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [state, setState] = useState<StateType<Type>>({
    data: [],
    error: null,
    isLoading: true,
  });
  const previousUrl = useRef("");
  const urlAndParams =
    url +
    "?" +
    new URLSearchParams(params as Record<string, string>).toString();

  useEffect(() => {
    if (hasEnded) return;
    setState((state) => ({ ...state, isLoading: true }));
    const controller = new AbortController();
    void fetchJSON<PaginatedResponse<Type>>({
      url: urlAndParams + `page=${String(page)}`,
      extraInit: { signal: controller.signal },
      onSuccess: (data) => {
        setState((currentState) => {
          const fetchedData =
            previousUrl.current === urlAndParams ? currentState.data : [];
          return {
            data: [...fetchedData, ...data.results],
            error: null,
            isLoading: false,
          };
        });
        if (data.next) setHasEnded(true);
        previousUrl.current = urlAndParams;
      },
      onError: (status, error) => {
        setState((state) => ({
          ...state,
          error: { status, message: error },
          isLoading: false,
        }));
      },
    });

    return () => {
      controller.abort();
    };
  }, [urlAndParams, page, retryCount, hasEnded]);

  const retry = () => {
    setRetryCount((retryCount) => retryCount + 1);
  };

  return { ...state, hasEnded, retry };
};

export default usePaginatedFetch;
