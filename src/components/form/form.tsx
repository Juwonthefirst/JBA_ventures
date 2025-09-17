import { type ReactNode } from "react";
import { objectToFormData, fetchData } from "@/helper.ts";

interface Props {
  url?: string;
  method?: "POST" | "PATCH" | "PUT";
  headers?: Record<string, string>;
  extraInit?: RequestInit;
  encType?: "application/json" | "multipart/form-data";
  className?: string;
  onSubmit: () => undefined | object | Promise<undefined | object>;
  onSuccess?: (response: Response) => void | Promise<void>;
  onError?: (response: Response | string) => void | Promise<void>;
  children: ReactNode;
}

const Form = ({
  url,
  method = "POST",
  headers,
  extraInit,
  encType = "application/json",
  className = "",
  onSubmit,
  onSuccess,
  onError,
  children,
}: Props) => {
  if (!headers) headers = {};
  if (!extraInit) extraInit = {};

  return (
    <form
      noValidate
      className={"flex flex-col gap-6 group " + className}
      onSubmit={(event) => {
        event.preventDefault();
        const returnValue = onSubmit();
        if (!returnValue || !url) return;

        const body =
          encType === "multipart/form-data"
            ? objectToFormData({ data: returnValue })
            : JSON.stringify(returnValue);

        if (encType === "application/json")
          headers["Content-Type"] = "application/json";

        void fetchData({
          url,
          headers,
          body,
          extraInit,
          method,
          onSuccess,
          onError,
        });
      }}
    >
      {children}
    </form>
  );
};

export default Form;
