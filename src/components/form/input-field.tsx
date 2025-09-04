import { type ChangeEventHandler } from "react";

interface InputFieldPropType {
    label: string;
    inputType: string;
    value?: string | number;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

const InputField = ({
    label,
    inputType,
    value,
    onChange
}: InputFieldPropType) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-lg" htmlFor={label + "-input"}>
                {label}
            </label>
            <input
                className="transistion-all duration-200 bg-slate-200 rounded-lg p-2 focus:outline-2 focus:bg-slate-100 outline-black text-inherit"
                id={label + "-input"}
                type={inputType}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};
export default InputField;
