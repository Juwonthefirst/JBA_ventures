import bgImage from "@/assets/images/images.jpeg";

const NotFoundPage = () => {
  return (
    <div className="relative h-screen">
      <img
        className="absolute top-0 left-0 -z-10 w-full h-full object-cover"
        src={bgImage}
      />
      <div className="h-full w-full text-white bg-black/40 p-6">
        <h1 className="text-2xl">404</h1>
      </div>
    </div>
  );
};

export default NotFoundPage;
