import { type ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const Title = ({ children }: Props) => {
    return <h1 className="mb-3 text-xl font-semibold">{children}</h1>;
};

export default Title;
