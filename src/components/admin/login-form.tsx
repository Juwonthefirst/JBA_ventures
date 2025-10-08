import InputField from "../form/input-field.tsx";
import Form from "../form/form.tsx";
import { useState, type ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { getStatusMessage } from "@/helper.ts";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api-client.ts";

interface Prop {
  error: Error | null;
}

const ErrorTag = ({ children }: { children: ReactNode }) => (
  <p className="text-sm text-red-500 self-center">{children}</p>
);

const LoginForm = ({ error: authErrorStatus }: Prop) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const loginQuery = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      api
        .post<{ access: string }>("/auth/login/", { email, password })
        .then((res) => res.data),

    onSuccess(data, variables, onMutateResult, context) {
      void variables;
      void onMutateResult;
      context.client.setQueryData(["accessToken"], () => data.access);
    },
  });

  return (
    <div className="flex flex-col dark:text-white">
      <div>
        <h1 className="text-2xl font-medium mb-2">Welcome back, admin</h1>
        <p>Login to access the admin page</p>
      </div>

      <Form
        onSubmit={() => {
          setErrors({
            email: email ? undefined : "Please fill in your email",
            password: password ? undefined : "Please fill in your email",
          });

          if (email && password) loginQuery.mutate({ email, password });
        }}
      >
        <InputField
          label="Email"
          inputType="email"
          required={false}
          value={email}
          error={errors.email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <InputField
          label="Password"
          inputType="password"
          required={false}
          value={password}
          error={errors.password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button
          className="flex justify-center bg-black text-white p-1 text-lg font-medium rounded-lg dark:text-black dark:bg-white"
          type="submit"
          disabled={loginQuery.isPending}
        >
          {loginQuery.isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Login"
          )}
        </button>
      </Form>
      {authErrorStatus &&
        !loginQuery.isError &&
        axios.isAxiosError<{ detail: string }>(authErrorStatus) && (
          <ErrorTag>
            {authErrorStatus.response?.status === 401
              ? "Sorry, you aren't currently authenticated"
              : getStatusMessage(authErrorStatus.response?.status || 600)}
          </ErrorTag>
        )}

      {loginQuery.isError &&
        axios.isAxiosError<{ detail: string }>(loginQuery.error) && (
          <ErrorTag>
            {loginQuery.error.response?.status === 401
              ? "Invalid email or password"
              : getStatusMessage(loginQuery.error.response?.status || 600)}
          </ErrorTag>
        )}
    </div>
  );
};

export default LoginForm;
