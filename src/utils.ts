import { XCircle, CheckCircle, RadioTower } from "lucide-react";

class ServerFile extends File {
  serverId: number;
  constructor(
    serverId: number,
    fileBits: BlobPart[],
    fileName: string,
    options?: FilePropertyBag
  ) {
    super(fileBits, fileName, options);
    this.serverId = serverId;
  }
}

export const isServerFile = (value: unknown) => value instanceof ServerFile;

export const urlToFile = async (url: string, serverId: number) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new ServerFile(serverId, [blob], url, {
    type: blob.type,
  });

  return file;
};

export const getStatusMessage = (statusCode: number) => {
  switch (true) {
    case statusCode === 401:
      return "You aren't authenticated, try to login again";
    case statusCode === 403:
      return "You aren't allowed here";
    case Math.floor(statusCode / 100) === 5:
      return "Our server is currently unavailable";
    case statusCode === 600:
      return "Unable to connect to the server";
    default:
      return "Something went wrong, try again later";
  }
};

export const getStatusIcon = (statusCode: number) => {
  switch (Math.floor(statusCode / 100)) {
    case 2:
      return CheckCircle;
    case 4:
      return XCircle;
    default:
      return RadioTower;
  }
};

export const propertyTypes = ["House", "Shop", "Land"];
export const propertyOffers = ["Sale", "Rent", "Lease"];

export const watchElementIntersecting = (
  target: HTMLElement | null,
  onIntersecting: () => void
) => {
  if (!target) return;
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      onIntersecting();
    }
  });
  observer.observe(target);

  return observer;
};

const powerToStringRepresentationMap: Record<number, string> = {
  2: "Million",
  3: "Billion",
  4: "Trillion",
};

export const numeralToStringRepresentation = (
  numeral: number,
  isRent: boolean
): string => {
  const rentString = isRent ? " /yr" : "";

  let powerOfAThousand = 0;
  while (numeral / 1000 > 1 && powerOfAThousand < 4) {
    numeral /= 1000;
    powerOfAThousand++;
  }

  if (powerOfAThousand === 1) return String(numeral * 1000) + rentString;

  const approximatedNumeral = Math.floor(numeral * 100) / 100;

  return `${String(approximatedNumeral)} ${
    powerToStringRepresentationMap[powerOfAThousand]
  }${rentString}`;
};
