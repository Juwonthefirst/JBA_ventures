import { RadioTower } from "lucide-react";
import { getStatusMessage } from "@/helper.ts";

interface Props {
    status: number;
    message?: string;
    onRetry?: () => void;
}

const ErrorCard = ({ status, message, onRetry }: Props) => {
    const statusMessage = message && getStatusMessage(status);
    return (
        <div className="flex flex-col items-center text-md gap-2 mt-5">
            <RadioTower
                className="text-red-500 bg-red-500/20 p-4 rounded-full"
                size="72"
            />
            <p>{statusMessage}</p>
            <button
                onClick={onRetry}
                type="button"
                className="px-3 py-1 dark:bg-white dark:text-black bg-black text-white rounded-md font-medium text-sm"
            >
                Retry
            </button>
        </div>
    );
};

export default ErrorCard;
