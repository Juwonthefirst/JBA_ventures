import { getStatusMessage, getStatusIcon } from "@/utils";

interface Props {
  status: number;
  message?: string;
  onRetry?: () => void;
  withRetry?: boolean;
  className?: string;
}

const StatusCard = ({
  status,
  message,
  onRetry,
  className = "",
  withRetry = false,
}: Props) => {
  const statusMessage = message || getStatusMessage(status);
  const StatusIcon = getStatusIcon(status);
  const iconColor =
    status > 299
      ? "text-red-500 bg-red-500/20"
      : "text-green-500 bg-green-500/20";

  return (
    <div
      className={
        "flex flex-col items-center text-md gap-2 mt-5" + " " + className
      }
    >
      <StatusIcon className={"p-4 rounded-full " + iconColor} size="72" />
      <p className="text-center">{statusMessage}</p>
      {withRetry && (
        <button
          onClick={onRetry}
          type="button"
          className="px-3 py-1 dark:bg-white dark:text-black bg-black text-white rounded-md font-medium text-sm"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default StatusCard;
