import type { ChangeEventHandler, RefObject } from "react";

const className =
    "text-sm transistion-all duration-200 bg-slate-200 rounded-lg p-2 focus:outline-2 focus:bg-slate-100 outline-black text-inherit dark:bg-zinc-800 dark:outline-white dark:focus:bg-zinc-900 ";

interface BaseInputFieldPropType {
    required?: boolean;
    label?: string;
    placeholder?: string;
    error?: string;
    inputType?: string;
    value?: string | number;
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

interface InputFieldPropType extends BaseInputFieldPropType {
    ref?: RefObject<HTMLInputElement>;
}

const InputField = ({
    ref,
    label="",
    placeholder,
    inputType = "text",
    value,
    onChange,
    required = true,
    error
}: InputFieldPropType) => {
    return (
        <div className="flex flex-col gap-2 dark:text-white">
            <label className="text-lg" htmlFor={label + "-input"}>
                {required && <span className="text-red-500 text-sm">* </span>}
                {label}
            </label>

            <input
                ref={ref}
                className={
                    className + (error ? "outline-2 outline-red-500!" : " ")
                }
                id={label + "-input"}
                type={inputType}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
            />

            {error && (
                <p className=" text-red-500 text-sm text-center mt-[-4px]">
                    {error}
                </p>
            )}
        </div>
    );
};

interface TextFieldPropType extends BaseInputFieldPropType {
    ref?: RefObject<HTMLTextAreaElement>;
}

export const TextField = ({
    ref,
    label = "",
    placeholder,
    value,
    onChange,
    required = true,
    error
}: TextFieldPropType) => {
    return (
        <div className="flex flex-col gap-2 dark:text-white">
            <label className="text-lg" htmlFor={label + "-input"}>
                {required && <span className="text-red-500 text-sm">* </span>}
                {label}
            </label>

            <textarea
                ref={ref}
                className={
                    className +
                    (error ? "outline-2 outline-red-500!" : " ") +
                    " overscroll-none"
                }
                id={label + "-input"}
                value={value}
                onChange={onChange}
                required={required}
                rows={3}
                placeholder={placeholder}
            />
            {error && (
                <p className=" text-red-500 text-sm text-center mt-[-4px]">
                    {error}
                </p>
            )}
        </div>
    );
};

export default InputField;
