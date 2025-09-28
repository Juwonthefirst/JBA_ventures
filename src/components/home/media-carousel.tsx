import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Media from "./media.tsx";

interface Props {
  urls: string[];
}

const MediaCarousel = ({ urls }: Props) => {
  return (
    <Carousel
      className="w-full md:w-3/5 lg:w-2/5 relative"
      opts={{ align: "start" }}
    >
      <CarouselContent className="">
        {urls.map((url) => (
          <CarouselItem
            key={url}
            className=" h-72 md:h-screen w-full md:p-4 /basis-4/5"
          >
            <Media src={url} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 text-accent border-0" />
      <CarouselNext className="absolute right-4 text-accent border-0" />
    </Carousel>
  );
};

export default MediaCarousel;
