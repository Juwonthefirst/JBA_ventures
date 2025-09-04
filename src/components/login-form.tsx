import InputField from "./form/input-field.tsx";
import Form from "./form/form.tsx";

const LoginForm = () => {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-medium mb-2">Welcome back, sir</h1>
                <p>Login to continue</p>
            </div>

            <Form
                onSubmit={() => {console.log("Juwon")}}
            >
                <InputField label="Email" inputType="email" />
                <InputField label="Password" inputType="password" />
                <input
                    className="bg-black text-white text-inherit p-1 text-lg rounded-lg"
                    type="submit"
                    value="Login"
                />
            </Form>
        </div>
    );
};

export default LoginForm;
