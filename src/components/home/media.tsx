import { useState } from "react";

interface Props {
  src: string;
}

const Media = ({ src }: Props) => {
  const [isImage, setisImage] = useState(true);

  return isImage ? (
    <img
      src={src}
      alt="media"
      className="w-full h-full object-cover rounded-lg"
      loading="lazy"
      onError={() => {
        setisImage(false);
      }}
    />
  ) : (
    <video
      src={src}
      playsInline
      controls
      className="w-full h-full object-cover rounded-lg"
    />
  );
};

export default Media;
