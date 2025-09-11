interface FetchJson<Type> {
    url: string;
    headers?: { [key: string]: string };
    body?: { [key: string]: string };
    method: "GET" | "POST" | "PUT" | "DELETE";
    onSuccess?: (data: Type) => void;
    onError?: (error: string | Type) => void;
}

export const fetchJSON = async <Type>({
    url,
    headers = {},
    body,
    method = "GET",
    onSuccess,
    onError
}: FetchJson<Type>) => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            body:
                method === "GET" || method === "DELETE"
                    ? undefined
                    : JSON.stringify(body)
        });

        const data: Type = await response.json().catch();
        if (!response.ok) return onError?.(data);
        onSuccess?.(data);
    } catch (error) {
        if (error instanceof Error) onError?.(error.message);
    }
};
