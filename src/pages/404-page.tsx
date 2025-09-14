import bgImage from "@/assets/images.jpeg";

const NotFoundPage = () => {
    return (
        <div className="relative h-screen">
            <img
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={bgImage}
            />
            <div>
            <p>404</p>
            </div>
           
        </div>
    );
};

export default NotFoundPage;
