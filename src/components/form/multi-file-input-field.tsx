import { useState, useEffect, type RefObject } from "react";
import { UploadIcon } from "lucide-react";

import FileField from "@/components/form/file-input-field.tsx";

interface Props {
    ref?: RefObject<File[]>;
    maxSize: number;
    onChange?: (newValues: File[]) => void;
}

const MultiFileField = ({ ref, maxSize, onChange }: Props) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    useEffect(() => {
        onChange?.(selectedFiles);
        if (ref) ref.current = selectedFiles;
    }, [selectedFiles]);

    

    const MAX_FILE_NUMBER = 9;
    const handleExtraFileUpload = (acceptedFiles: File[]) => {
        setSelectedFiles(
            [...selectedFiles, ...acceptedFiles].slice(0, MAX_FILE_NUMBER)
        );
    };

    const handleRemoveExtraFile = (removedFile: File) => {
        const updatedSelectedFiles = selectedFiles.filter(
            (file) => file !== removedFile
        );
        setSelectedFiles(updatedSelectedFiles);
    };

    return (
        <div>
            <div className="flex gap-4 border border-black dark:border-white rounded-lg h-36 mb-4 p-3 overflow-x-auto">
                {selectedFiles.map((file) => {
                    const MediaTag = file.type.startsWith("image/")
                        ? "img"
                        : "video";
                    return (
                        <div
                            key={file.name}
                            className="relative h-full w-24 shrink-0"
                        >
                            <MediaTag
                                className="absolute top-0 left-0 h-full w-full object-cover"
                                src={URL.createObjectURL(file)}
                                controls
                                playsInline
                            />
                            <button
                                onClick={() => handleRemoveExtraFile(file)}
                                className="absolute top-0 right-0 bg-black text-white dark:bg-white dark:text-black rounded-full p-1 text-xs font-medium"
                            >
                                X
                            </button>
                        </div>
                    );
                })}
            </div>
            <FileField
                maxSize={maxSize}
                maxFiles={MAX_FILE_NUMBER}
                disabled={selectedFiles.length >= MAX_FILE_NUMBER}
                onUpload={handleExtraFileUpload}
                showPreview={false}
                accept={{ "image/*": [], "video/*": [] }}
                className="static flex flex-row w-fit bg-black text-white dark:bg-white dark:text-black ml-auto"
            >
                <UploadIcon />
                <p>Upload</p>
            </FileField>
        </div>
    );
};

export default MultiFileField;
