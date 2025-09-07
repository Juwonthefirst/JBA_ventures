import InputField from "./form/input-field.tsx";
import Form from "./form/form.tsx";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

interface Prop {
    fetchType: string | null;
    error: string | null;
    login: (email: string, password: string) => void;
}

const LoginForm = ({ login, error: loginError, fetchType }: Prop) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>(
        {}
    );

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-medium mb-2">
                    Welcome back, admin
                </h1>
                <p>Login to access the admin page</p>
            </div>

            <Form
                onSubmit={() => {
                    if (!email)
                        setErrors({
                            email: "Please fill in your email"
                        });
                    return;
                    if (!password)
                        setErrors({
                            password: "Please fill in your password"
                        });
                    return;
                    login(email, password);
                }}
            >
                <InputField
                    label="Email"
                    inputType="email"
                    value={email}
                    error={loginError || errors.email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />
                <InputField
                    label="Password"
                    inputType="password"
                    value={password}
                    error={errors.password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
                <button
                    className="flex justify-center bg-black text-white text-inherit p-1 text-lg rounded-lg"
                    type="submit"
                >
                    {fetchType === "login" ? (
                        <LoaderCircle className="animate-spin" />
                    ) : (
                        "Login"
                    )}
                </button>
            </Form>
        </div>
    );
};

export default LoginForm;
