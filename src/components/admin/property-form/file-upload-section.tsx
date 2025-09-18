import { Controller, type Control } from "react-hook-form";
import { UploadIcon } from "lucide-react";

import FileField from "@/components/form/file-input-field.tsx";
import MultiFileField from "@/components/form/multi-file-input-field.tsx";
import type { PropertyFormInputs } from "@/types.ts";

interface Props {
  control: Control<PropertyFormInputs>;
}

const FileUploadSection = ({ control }: Props) => {
  const MAX_FILE_SIZE = 1024 * 1024 * 2;
  const cleanMainImageOutput = (callback: (file: File) => void) => {
    return (files: File[]) => {
      callback(files[0]);
    };
  };
  return (
    <>
      <Controller
        name="main_image"
        control={control}
        rules={{
          required: "You need to upload the property main image",
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FileField
            value={value}
            onUpload={cleanMainImageOutput(onChange)}
            error={error?.message}
            maxSize={MAX_FILE_SIZE}
            accept={{ "image/*": [] }}
            className="p-2"
          >
            <div className={"flex flex-col items-center justify-center h-64"}>
              <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <UploadIcon />
              </div>
              <p className="my-2 w-full truncate text-wrap font-medium text-sm">
                Upload property main image
              </p>
              <p className="w-full truncate text-wrap text-muted-foreground text-xs">
                Drag and drop or click to upload
              </p>
            </div>
          </FileField>
        )}
      />
      <Controller
        name="extra_media"
        control={control}
        render={({ field: { onChange, value } }) => (
          <MultiFileField
            value={value}
            onChange={onChange}
            maxSize={MAX_FILE_SIZE}
          />
        )}
      />
    </>
  );
};

export default FileUploadSection;
