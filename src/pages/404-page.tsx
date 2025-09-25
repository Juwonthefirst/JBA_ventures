import bgImage from "@/assets/images/images.jpeg";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="relative h-screen">
      <img
        className="absolute top-0 left-0 -z-10 w-full h-full object-cover hidden"
        src={bgImage}
      />
      <div className="flex flex-col items-center h-full w-full p-18 ">
        <h1 className="text-2xl lg:text-3xl font-semibold text-accent mt-4">
          404
        </h1>
        <p className="text-3xl lg:text-5xl mt-4 border-b-2 font-bold text-center border-accent pb-8">
          This page does not exist
        </p>
        <p className="pt-4 opacity-70 text-sm md:text-lg text-center">
          Sorry, the page you are looking for doesn't exist
        </p>
        <Link
          className="text-accent underline underline-offset-2 mt-16 flex gap-1 items-center"
          to="/"
        >
          <ArrowLeft size={18} /> Back home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
