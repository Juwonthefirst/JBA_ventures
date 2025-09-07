import { useState, useEffect, useRef } from "react";
import { type ParamsType } from "../types.ts";

interface StateType<Type> {
    data: Type | null;
    error: Error | null;
    isLoading: boolean;
}

interface CacheType<Type> {
    [key: string]: { data: Type; exp: number };
}

interface FetchInit {
    headers?: ParamsType;
    body: { [key: string]: string | number };
    method: "POST" | "PUT" | "DELETE";
}

const useCachedFetch = function <Type>(
    url: string,
    params: ParamsType,
    init?: FetchInit,
    cacheMinutes = 5
): StateType<Type> {
    const cache = useRef<CacheType<Type>>({});
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
        const cachedResponse = cache.current[urlAndParams];
        if (cachedResponse && cachedResponse.exp > Date.now()) {
            setState({
                data: cachedResponse.data,
                error: null,
                isLoading: false
            });
            return;
        }

        setState((state) => ({ ...state, isLoading: true }));
        const controller = new AbortController();

        (async () => {
            const response = await fetch(urlAndParams, {
                method: init ? init.method : "GET",
                headers: init? init.headers : undefined,
                signal: controller.signal,
                body: init ? JSON.stringify(init.body) : undefined
            });
            const data = (await response.json()) as Type;
            if (!response.ok) throw new Error(response.statusText);

            setState({ data, error: null, isLoading: false });
            cache.current[urlAndParams] = {
                data,
                exp: Date.now() + cacheDuration
            };
        })().catch((error: unknown) => {
            if (error instanceof Error && error.name !== "AbortError") {
                setState({ data: null, error: error, isLoading: false });
            }
        });

        return () => {
            controller.abort();
        };
    }, [urlAndParams, cacheDuration]);

    return state;
};

export default useCachedFetch;
