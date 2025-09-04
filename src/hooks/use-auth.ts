import { useState, useEffect, useRef } from "react";

interface StateType {
    authToken: string | null;
    error: string | null;
    isFetching: boolean;
}

interface UseAuthReturnType extends StateType {
    login: (email: string, password: string) => Promise<void>;
}

const useAuth = (): UseAuthReturnType => {
    const [authState, setAuthState] = useState<StateType>({
        authToken: null,
        error: null,
        isFetching: false
    });
    const csrfToken = useRef("");
    const refreshIntervalKey = useRef<number | undefined>(undefined);
    const backendURL = import.meta.env.VITE_BACKEND_URL + "/api/v1/auth/";

    const refreshAccessToken = async (signal: AbortSignal): Promise<void> => {
        const response = await fetch(backendURL + "token/refresh/", {
            signal,
            credentials: "include",
            headers: {
                "X-CSRFTOKEN": csrfToken.current
            }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || response.statusText);
        setAuthState({
            error: null,
            isFetching: false,
            authToken: data.access
        });
    };

    const fetchCSRFToken = async (signal: AbortSignal): Promise<void> => {
        const response = await fetch(backendURL + "csrf/", {
            signal
        });
        const data = await response.json();
        if (!response.ok) throw new Error(response.statusText);
        csrfToken.current = data.csrf;
    };

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setAuthState((currentAuthState) => ({
            ...currentAuthState,
            isFetching: true
        }));
        (async () => {
            if (!csrfToken.current) await fetchCSRFToken(signal);
            await refreshAccessToken(signal);
            refreshIntervalKey.current = setInterval(
                () =>
                    refreshAccessToken(signal).catch((error) => {
                        if (error.name !== "AbortError") {
                            setAuthState({
                                error: error.message,
                                isFetching: false,
                                authToken: null
                            });
                        }
                    }),
                45 * 60 * 1000
            );
        })().catch((error) => {
            if (error.name !== "AbortError") {
                setAuthState({
                    error: error.message,
                    isFetching: false,
                    authToken: null
                });
            }
        });
        return () => {
            abortController.abort();
            clearInterval(refreshIntervalKey.current);
        };
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch(backendURL + "login/", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            setAuthState({
                authToken: data.access,
                isFetching: false,
                error: null
            });
        } catch (error: any) {
            setAuthState({
                authToken: null,
                isFetching: false,
                error: error.message
            });
        }
    };

    return {
        ...authState,
        login
    };
};

export default useAuth;
