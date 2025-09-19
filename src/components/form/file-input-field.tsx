import { useState, type ReactNode } from "react";

import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone/index.tsx";

interface Props {
  value?: File;
  error?: string;
  accept?: { [key: string]: string[] };
  maxFiles?: number;
  maxSize?: number;
  minSize?: number;
  onUpload?: (files: File[]) => void;
  onError?: (error: Error) => void;
  className?: string;
  disabled?: boolean;
  children: ReactNode;
}

const FileInputField = ({ children, error, value, ...props }: Props) => {
  const [internalError, setInternalError] = useState("");

  const handleUpload = (acceptedFiles: File[]) => {
    props.onUpload?.(acceptedFiles);
    setInternalError("");
  };

  const handleError = (error: Error) => {
    setInternalError(error.message);
    props.onError?.(error);
  };

  const imgSRC = value && URL.createObjectURL(value);

  return (
    <div>
      <Dropzone
        className=""
        {...props}
        src={value && [value]}
        onDrop={handleUpload}
        onError={handleError}
      >
        <DropzoneEmptyState>{children}</DropzoneEmptyState>
        <DropzoneContent>
          <img className="h-64 w-full object-cover rounded-md" src={imgSRC} />
        </DropzoneContent>
      </Dropzone>
      {(error || internalError) && (
        <p className=" text-red-500 text-sm text-center mt-1 mb-4">
          {internalError || error}
        </p>
      )}
    </div>
  );
};

export default FileInputField;
