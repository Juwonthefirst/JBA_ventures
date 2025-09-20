import { useState, useEffect } from "react";
import { type ParamsType } from "../types.ts";
import { fetchJSON } from "@/helper.ts";

interface StateType<Type> {
  data: Type | null;
  error: { status: number; message: string } | null;
  isLoading: boolean;
}

interface ReturnType<Type> extends StateType<Type> {
  retry: () => void;
}

interface CacheType<Type> {
  [key: string]: { data: Type; exp: number };
}

let globalCache = {};
export const clearCache = () => {
  globalCache = {};
};

const useCachedFetch = function <Type>(
  url: string,
  params?: ParamsType,
  cacheMinutes = 5
): ReturnType<Type> {
  const cache: CacheType<Type> = globalCache;
  const [retryCount, setRetryCount] = useState(0);
  const [state, setState] = useState<StateType<Type>>({
    data: null,
    error: null,
    isLoading: true,
  });

  const urlAndParams =
    url +
    "?" +
    new URLSearchParams(params as Record<string, string>).toString();
  const cacheDuration = cacheMinutes * 60 * 1000;

  useEffect(() => {
    const cachedResponse = cache[urlAndParams];
    if (urlAndParams in cache && cachedResponse.exp > Date.now()) {
      setState({
        data: cachedResponse.data,
        error: null,
        isLoading: false,
      });
      return;
    }

    setState((state) => ({ ...state, isLoading: true }));
    const controller = new AbortController();
    fetchJSON<Type>({
      url: urlAndParams,
      extraInit: { signal: controller.signal },
      onSuccess: (data) => {
        setState({ data, error: null, isLoading: false });

        cache[urlAndParams] = {
          data,
          exp: Date.now() + cacheDuration,
        };
      },
      onError: (status, error) => {
        setState({
          data: null,
          error: { status, message: error },
          isLoading: false,
        });
      },
    }).catch((error: unknown) => {
      console.error(error);
    });

    return () => {
      controller.abort();
    };
  }, [urlAndParams, cacheDuration, cache, retryCount]);

  const retry = () => {
    setRetryCount((retryCount) => retryCount + 1);
  };

  return { ...state, retry };
};

export default useCachedFetch;
