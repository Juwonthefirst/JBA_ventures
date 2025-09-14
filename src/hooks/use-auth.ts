import { useReducer, useEffect, useRef, useCallback } from "react";
import { type AuthStateType } from "@/types.ts";
import authReducer from "@/reducers/authReducer.ts";

interface UseAuthReturnType extends AuthStateType {
    login: (email: string, password: string) => Promise<void>;
}

const REFRESH_INTERVAL = 30 * 60 * 1000;

const useAuth = (): UseAuthReturnType => {
    const [authState, dispatch] = useReducer(authReducer, {
        authToken: undefined,
        error: undefined,
        fetchType: "initial",
        isAuthenticated: false
    });
    const csrfTokenRef = useRef("");
    const backendURL =
        String(import.meta.env.VITE_BACKEND_URL) + "/api/v1/auth/";

    const refreshAccessToken = useCallback(
        async (signal: AbortSignal): Promise<void> => {
            const response = await fetch(backendURL + "token/refresh/", {
                method: "POST",
                signal,
                credentials: "include",
                headers: {
                    "X-CSRFTOKEN": csrfTokenRef.current
                }
            });
            const data = (await response.json()) as {
                access?: string;
                error?: string;
            };
            if (!response.ok)
                throw new Error(data.error || response.statusText);
            dispatch({ type: "SET_ACCESS_TOKEN", access: data.access });
        },
        [backendURL]
    );

    const fetchCSRFToken = useCallback(
        async (signal: AbortSignal): Promise<void> => {
            const response = await fetch(backendURL + "csrf/", {
                signal
            });
            const data = (await response.json()) as { csrf: string };
            if (!response.ok) throw new Error(response.statusText);
            csrfTokenRef.current = data.csrf;
        },
        [backendURL]
    );

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        (async () => {
            dispatch({ type: "START_INITIAL_FETCH" });
            if (!csrfTokenRef.current) await fetchCSRFToken(signal);
            await refreshAccessToken(signal);
        })().catch((error: unknown) => {
            if (error instanceof Error && error.name !== "AbortError") {
                dispatch({
                    type: "SET_FETCH_ERROR",
                    error: error.message
                });
            }
        });
        return () => {
            abortController.abort();
        };
    }, [fetchCSRFToken, refreshAccessToken]);

    useEffect(() => {
        if (!authState.isAuthenticated) return;
        alert("refreshing");
        const abortController = new AbortController();
        const intervalKey = setInterval(() => {
            refreshAccessToken(abortController.signal).catch(
                (error: unknown) => {
                    if (error instanceof Error && error.name !== "AbortError") {
                        dispatch({
                            type: "SET_FETCH_ERROR",
                            error: error.message
                        });
                    }
                }
            );
        }, REFRESH_INTERVAL);

        return () => {
            clearInterval(intervalKey);
            abortController.abort();
        };
    }, [authState.isAuthenticated, refreshAccessToken]);

    const login = async (email: string, password: string) => {
        dispatch({ type: "START_LOGIN_FETCH" });
        try {
            const response = await fetch(backendURL + "login/", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = (await response.json()) as {
                access?: string;
                error?: string;
            };

            if (!response.ok) throw new Error(data.error);
            //if (data.access)
            dispatch({
                type: "SET_ACCESS_TOKEN",
                access: data.access
            });
        } catch (error) {
            if (error instanceof Error) {
                dispatch({
                    type: "SET_FETCH_ERROR",
                    error: error.message
                });
            }
        }
    };

    return {
        ...authState,
        login
    };
};

export default useAuth;
