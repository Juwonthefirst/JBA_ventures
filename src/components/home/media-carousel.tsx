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
    <Carousel className="w-full lg:w-2/5 lg:max-h-xl relative">
      <CarouselContent className="">
        {urls.map((url) => (
          <CarouselItem
            key={url}
            className=" h-72 md:h-84 lg:h-screen w-full lg:p-4"
          >
            <Media src={url} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 text-accent border-0 scale-125" />
      <CarouselNext className="absolute right-4 text-accent border-0 scale-125" />
    </Carousel>
  );
};

export default MediaCarousel;
