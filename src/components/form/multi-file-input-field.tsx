import { UploadIcon } from "lucide-react";
import { motion } from "motion/react";
import FileField from "@/components/form/file-input-field.tsx";

interface Props {
  maxSize: number;
  value: File[];
  onChange?: (newValues: File[]) => void;
}

const MultiFileField = ({ maxSize, onChange, value }: Props) => {
  //if(!value) value = []
  const MAX_FILE_NUMBER = 9;
  const handleExtraFileUpload = (acceptedFiles: File[]) => {
    const updatedSelectedFiles = [...value, ...acceptedFiles].slice(
      0,
      MAX_FILE_NUMBER
    );
    onChange?.(updatedSelectedFiles);
  };

  const handleRemoveExtraFile = (removedFileIndex: number) => {
    const updatedSelectedFiles = value.filter(
      (_, index) => index !== removedFileIndex
    );
    onChange?.(updatedSelectedFiles);
  };

  return (
    <div>
      <motion.div
        layout
        className="flex gap-4 border border-black dark:border-white rounded-lg h-36 mb-4 p-3 overflow-x-auto"
      >
        {value.map((file, index) => {
          const key = file.name;
          const mediaSRC = URL.createObjectURL(file);
          const MediaTag = file.type.startsWith("image/") ? "img" : "video";

          return (
            <div key={key} className="relative h-full w-24 shrink-0">
              <MediaTag
                className="absolute top-0 left-0 h-full w-full object-cover rounded-md"
                src={mediaSRC}
                controls
                playsInline
              />
              <button
                type="button"
                onClick={() => {
                  handleRemoveExtraFile(index);
                }}
                className="absolute top-0 right-0 bg-black text-white dark:bg-white dark:text-black rounded-full p-1 text-xs font-medium"
              >
                X
              </button>
            </div>
          );
        })}
      </motion.div>
      <FileField
        maxSize={maxSize}
        maxFiles={MAX_FILE_NUMBER}
        disabled={value.length >= MAX_FILE_NUMBER}
        onUpload={handleExtraFileUpload}
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
