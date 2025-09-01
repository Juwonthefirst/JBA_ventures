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

const useCachedFetch = function <Type>(
    url: string,
    params: ParamsType,
    cacheMinutes = 10
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
            try {
                const response = await fetch(urlAndParams, {
                    signal: controller.signal
                });
                const data: Type = await response.json();
                if (!response.ok) throw new Error(response.statusText);

                setState({ data, error: null, isLoading: false });
                cache.current[urlAndParams] = {
                    data,
                    exp: Date.now() + cacheDuration
                };
            } catch (e) {
                if (e instanceof Error && e.name !== "AbortError") {
                    setState({ data: null, error: e, isLoading: false });
                }
            }
        })();

        return () => controller.abort();
    }, [urlAndParams]);

    return state;
};

export default useCachedFetch;
