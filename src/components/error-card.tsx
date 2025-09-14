import { RadioTower } from "lucide-react";

const getStatusMessage = (status: number) => {
    switch (true) {
        case status === 403:
            return "You aren't allowed here";
        case Math.floor(status / 100) === 5:
            return "Our server is currently unavailable";
        case status === 600:
            return "Unable to connect to the server";
        default:
            return "Something went erong, try again later";
    }
};
interface Props {
    status: number;
    onRetry?: () => void;
}

const ErrorCard = ({ status, onRetry }: Props) => {
    const message = getStatusMessage(status);
    return (
        <div className="flex flex-col items-center text-md gap-2 mt-5">
            <RadioTower
                className="text-red-500 bg-red-500/20 p-4 rounded-full"
                size="72"
            />
            <p>{message}</p>
            <button
                onClick={onRetry}
                type="button"
                className="px-3 py-1 dark:bg-white dark:text-black bg-black text-white rounded-sm font-medium text-sm"
            >
                Retry
            </button>
        </div>
    );
};

export default ErrorCard;
