import { XCircle, CheckCircle, RadioTower } from "lucide-react";
import type { FormDataObject } from "./types";

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
  onError,
}: FetchJson<Type>) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body:
        method === "GET" || method === "DELETE"
          ? undefined
          : JSON.stringify(body),
      ...extraInit,
    });

    const data = (await response
      .json()
      .catch((error: unknown) => void error)) as Type;
    if (!response.ok) {
      void onError?.(response.status, JSON.stringify(data));
      return;
    }
    void onSuccess?.(data);
  } catch (error) {
    if (error instanceof Error && error.name !== "AbortError")
      void onError?.(600, error.message);
  }
};

interface ObjectToFormDataPara {
  data: FormDataObject;
  formData?: FormData;
  namespace?: string;
}

export const objectToFormData = ({
  data,
  formData = new FormData(),
  namespace = "",
}: ObjectToFormDataPara): FormData => {
  Object.keys(data).forEach((key) => {
    const value = data[key];
    const formKey = namespace ? `${namespace}[${key}]` : key;
    if (typeof value === "number") {
      formData.append(formKey, String(value));
    } else if (value instanceof Blob || typeof value === "string") {
      formData.append(formKey, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === "object" && !(item instanceof Blob)) {
          objectToFormData({
            data: item,
            formData,
            namespace: `${formKey}[${String(index)}]`,
          });
        } else {
          if (typeof item === "number") item = String(item);
          formData.append(`${formKey}[${String(index)}]`, item);
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
  onSuccess?: (response: Response) => void | Promise<void>;
  onError?: (response: Response | string) => void | Promise<void>;
}

export const fetchData = async ({
  url,
  headers,
  body,
  extraInit,
  method,
  onSuccess,
  onError,
}: FetchData) => {
  try {
    const response = await fetch(url, {
      method,
      headers,
      body,
      ...extraInit,
    });
    if (!response.ok) {
      void onError?.(response);
      return;
    }
    void onSuccess?.(response);
  } catch (error) {
    if (error instanceof Error && error.name !== "AbortError")
      void onError?.(error.message);
  }
};

export const urlToFile = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const file: File & { fetched?: boolean } = new File([blob], url, {
    type: blob.type,
  });
  file.fetched = true;
  return file;
};

export const getStatusMessage = (statusCode: number) => {
  switch (true) {
    case statusCode === 401:
      return "You aren't authenticated, try to login again";
    case statusCode === 403:
      return "You aren't allowed here";
    case Math.floor(statusCode / 100) === 5:
      return "Our server is currently unavailable";
    case statusCode === 600:
      return "Unable to connect to the server";
    default:
      return "Something went wrong, try again later";
  }
};

export const getStatusIcon = (statusCode: number) => {
  switch (Math.floor(statusCode / 100)) {
    case 2:
      return CheckCircle;
    case 4:
      return XCircle;
    default:
      return RadioTower;
  }
};

export const propertyTypes = ["House", "Shop", "Land"];
export const propertyOffers = ["Sale", "Rent", "Lease"];

export const watchElementIntersecting = (
  target: HTMLElement | null,
  onIntersecting: () => void
) => {
  if (!target) return;
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      onIntersecting();
    }
  });
  observer.observe(target);

  return observer;
};

const powerToStringRepresentationMap: Record<number, string> = {
  2: "Million",
  3: "Billion",
  4: "Trillion",
};

export const numeralToStringRepresentation = (
  numeral: number,
  isRent: boolean
): string => {
  const rentString = isRent ? " /yr" : "";

  let powerOfAThousand = 0;
  while (numeral / 1000 > 1 && powerOfAThousand < 4) {
    numeral /= 1000;
    powerOfAThousand++;
  }

  if (powerOfAThousand === 1) return String(numeral * 1000) + rentString;

  const approximatedNumeral = Math.floor(numeral * 100) / 100;

  return `${String(approximatedNumeral)} ${
    powerToStringRepresentationMap[powerOfAThousand]
  }${rentString}`;
};
