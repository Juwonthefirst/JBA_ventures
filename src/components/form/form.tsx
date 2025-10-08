import type { ReactNode } from "react";

interface Props {
  className?: string;
  onSubmit: () => void | Promise<void>;
  children: ReactNode;
}

const Form = ({ onSubmit, children }: Props) => {
  return (
    <form
      noValidate
      className="flex flex-col gap-6 p-6 "
      onSubmit={(event) => {
        event.preventDefault();
        void onSubmit();
      }}
    >
      {children}
    </form>
  );
};

export default Form;
