import { type ChangeEventHandler } from "react";

interface InputFieldPropType {
    required?: boolean;
    label: string;
    error?: string;
    inputType?: string;
    value?: string | number;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

const InputField = ({
    label,
    inputType = "text",
    value,
    onChange,
    required = true,
    error
}: InputFieldPropType) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-lg" htmlFor={label + "-input"}>
                {required && <span className="text-red-500 text-sm">* </span>}
                {label}
            </label>
            <input
                className="transistion-all duration-200 bg-slate-200 rounded-lg p-2 focus:outline-2 focus:bg-slate-100 outline-black text-inherit"
                id={label + "-input"}
                type={inputType}
                value={value}
                onChange={onChange}
                required={required}
            />
            {error && (
                <p className="group-data-[submitted=false]:hidden text-red-500 text-sm text-center mt-[-4px]">
                    {error}
                </p>
            )}
        </div>
    );
};
export default InputField;
