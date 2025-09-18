import InputField from "./form/input-field.tsx";
import Form from "./form/form.tsx";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { getStatusMessage } from "@/helper.ts";

interface Prop {
  fetchType: string | undefined;
  error: number | undefined;
  login: (email: string, password: string) => void;
}

const LoginForm = ({ login, error: loginErrorStatus, fetchType }: Prop) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  //Todo fix handling of 401 error

  return (
    <div className="flex flex-col gap-6 dark:text-white">
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

          if (email && password) login(email, password);

          return;
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
          disabled={fetchType === "login"}
        >
          {fetchType === "login" ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Login"
          )}
        </button>
      </Form>
      {loginErrorStatus && (
        <p className="text-sm text-red-500 self-center">
          {getStatusMessage(loginErrorStatus)}
        </p>
      )}
    </div>
  );
};

export default LoginForm;
