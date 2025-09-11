import { useState, type ReactNode, type RefObject } from "react";

import {
    Dropzone,
    DropzoneContent,
    DropzoneEmptyState
} from "@/components/ui/shadcn-io/dropzone/index.tsx";

interface Props {
    ref?: RefObject<File[] | undefined>;
    error?: string;
    accept?: { [key: string]: string[] };
    maxFiles?: number;
    maxSize?: number;
    minSize?: number;
    onUpload?: (files: File[]) => void;
    onError?: (error: Error) => void;
    className?: string;
    disabled?: boolean;

    showPreview?: boolean;
    children: ReactNode;
}

const FileInputField = ({
    showPreview = true,
    children,
    error,
    ...props
}: Props) => {
    const [files, setFiles] = useState<File[] | undefined>(undefined);
    const [internalError, setInternalError] = useState("");

    if (props.ref) props.ref.current = files;

    const handleUpload = (acceptedFiles: File[]) => {
        if (showPreview) setFiles(acceptedFiles);
        props.onUpload?.(acceptedFiles);
    };

    const handleError = (error: Error) => {
        setInternalError(error.message);
        props.onError?.(error);
    };

    return (
        <div>
            <Dropzone
                {...props}
                src={files}
                onDrop={handleUpload}
                onError={handleError}
            >
                <DropzoneEmptyState>{children}</DropzoneEmptyState>
                <DropzoneContent>
                    <img
                        className="h-64 w-full object-cover"
                        src={files && URL.createObjectURL(files[0])}
                    />
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
