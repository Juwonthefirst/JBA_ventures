import { type ReactNode, useState } from "react";

interface Props {
    className?: string;
    onSubmit: () => void;
    children: ReactNode;
}

const Form = ({ className = "", onSubmit, children }: Props) => {
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    return (
        <form
            noValidate
            data-submitted={hasSubmitted}
            className={"flex flex-col gap-6 group " + className}
            onSubmit={(event) => {
                setHasSubmitted(true);
                event.preventDefault();
                onSubmit();
            }}
        >
            {children}
        </form>
    );
};

export default Form;
