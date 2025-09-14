interface FetchJson<Type> {
    url: string;
    headers?: Record<string, string>;
    body?: BodyInit;
    extraInit?: RequestInit;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    onSuccess?: (data: Type) => void | Promise<void>;
    onError?: (status: number, error: string) => void | Promise<void>;
}

export const fetchJSON = async <Type>({
    url,
    headers = {},
    body,
    extraInit = {},
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
                    : JSON.stringify(body),
            ...extraInit
        });

        const data: Type = await response.json().catch();
        if (!response.ok) {
            onError?.(response.status, JSON.stringify(data));
            return;
        }
        onSuccess?.(data);
    } catch (error) {
        if (error instanceof Error && error.name !== "AbortError")
            onError?.(600, error.message);
    }
};

interface ObjectToFormDataPara {
    data: { [key: string]: any };
    formData?: FormData;
    namespace?: string;
}

export const objectToFormData = ({
    data,
    formData = new FormData(),
    namespace = ""
}: ObjectToFormDataPara): FormData => {
    Object.keys(data).forEach((key) => {
        const value = data[key];
        const formKey = namespace ? `${namespace}[${key}]` : key;
        if (typeof value === "number") {
            formData.append(formKey, String(value));
        } else if (value instanceof File) {
            formData.append(formKey, value);
        } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
                if (typeof item === "object" && !(item instanceof File)) {
                    objectToFormData({
                        data: item,
                        formData,
                        namespace: `${formKey}[${index}]`
                    });
                } else {
                    formData.append(`${formKey}[${index}]`, item);
                }
            });
        } else if (typeof value === "object") {
            objectToFormData({ data: value, formData, namespace: formKey });
        } else {
            formData.append(formKey, value);
        }
    });

    return formData;
};

export const arrayToFormData = (
    key: string,
    formData = new FormData(),
    array: string[] | Blob[] | number[]
) => {
    array.forEach((item) => {
        if (typeof item === "number") item = String(item);
        formData.append(key, item);
    });
    return formData;
};

interface FetchData {
    url: string;
    headers: Record<string, string>;
    body: FormData | string;
    extraInit: RequestInit;
    method: "POST" | "PATCH" | "PUT";
    onSuccess?: (response: Response) => void;
    onError?: (response: Response | string) => void;
}

export const fetchData = async ({
    url,
    headers,
    body,
    extraInit,
    method,
    onSuccess,
    onError
}: FetchData) => {
    try {
        const response = await fetch(url, {
            method,
            headers,
            body,
            ...extraInit
        });
        if (!response.ok) {
            onError?.(response);
            return;
        }
        onSuccess?.(response);
    } catch (error) {
        if (error instanceof Error && error.name !== "AbortError")
            onError?.(error.message);
    }
};

export const urlToFile = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const file: File & { fetched?: boolean }  = new File([blob], url, {
        type: blob.type
    });
    file.fetched = true
    return file;
};
