import { useState, useEffect } from "react";
import { type ParamsType } from "../types.ts";

interface StateType<Type> {
    data: Type | null;
    error: string | null;
    isLoading: boolean;
}

interface ReturnValue<Type> extends StateType<Type> {
    clearCache: () => void;
}

interface CacheType<Type> {
    [key: string]: { data: Type; exp: number };
}

let globalCache = {};

const useCachedFetch = function <Type>(
    url: string,
    params?: ParamsType,
    cacheMinutes = 5
): ReturnValue<Type> {
    const cache: CacheType<Type> = globalCache;
    const [state, setState] = useState<StateType<Type>>({
        data: null,
        error: null,
        isLoading: true
    });

    const urlAndParams =
        url +
        "?" +
        new URLSearchParams(params as Record<string, string>).toString();
    const cacheDuration = cacheMinutes * 60 * 1000;

    useEffect(() => {
        const cachedResponse = cache[urlAndParams];
        if (cachedResponse && cachedResponse.exp > Date.now()) {
            setState({
                data: cachedResponse.data,
                error: null,
                isLoading: false
            });
            alert("using cache");
            return;
        }

        setState((state) => ({ ...state, isLoading: true }));
        const controller = new AbortController();

        (async () => {
            const response = await fetch(urlAndParams, {
                signal: controller.signal
            });
            const data = (await response.json()) as Type;
            if (!response.ok) throw new Error(response.statusText);

            setState({ data, error: null, isLoading: false });

            cache[urlAndParams] = {
                data,
                exp: Date.now() + cacheDuration
            };
        })().catch((error: unknown) => {
            if (error instanceof Error && error.name !== "AbortError") {
                setState({
                    data: null,
                    error: error.message,
                    isLoading: false
                });
            }
        });

        return () => {
            controller.abort();
        };
    }, [urlAndParams, cacheDuration]);

    return {
        ...state,
        clearCache: () => {
            globalCache = {};
        }
    };
};

export default useCachedFetch;
