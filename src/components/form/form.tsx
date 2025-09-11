import { type ReactNode } from "react";

interface Props {
    className?: string;
    onSubmit: () => void;
    children: ReactNode;
}

//Todo add automatic sending to backend just like RHF form with the the data being sent the return value of onSubmit
const Form = ({ className = "", onSubmit, children }: Props) => {
    return (
        <form
            noValidate
            className={"flex flex-col gap-6 group " + className}
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
