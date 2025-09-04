import { type ReactNode } from "react";

interface Props {
    onSubmit: () => void | Promise<void>;
    children: ReactNode;
}

const Form = ({ onSubmit, children }: Props) => {
    return (
        <form
        className="flex flex-col gap-6"
            onSubmit={(event) => {
                event.preventDefault();
                onSubmit();
            }}
        >
            {children}
        </form>
    );
};

export default Form;
