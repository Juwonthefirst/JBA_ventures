import { Link, Outlet, useLocation } from "react-router";

const Header = () => {
  const currentLocation = useLocation();

  return (
    <header className="flex py-2 px-4 md:px-12 md:py-3 fixed top-0 left-0 z-10 items-center justify-between w-full bg-white dark:bg-black">
      <h1 className="text-xl font-semibold italic">JBA</h1>
      <nav className="text-sm  flex gap-3 md:gap-8 *:data-[iscurrent=true]:scale-110 *:data-[iscurrent=true]:font-semibold *:data-[iscurrent=true]:text-accent *:data-[iscurrent=false]:opacity-70 *:transition-all *:duration-200 md:mr-12 *:data-[iscurrent=false]:hover:opacity-100  *:data-[iscurrent=false]:hover:scale-105">
        <Link data-iscurrent={currentLocation.pathname === "/"} to="/">
          Home
        </Link>
        <Link
          data-iscurrent={currentLocation.pathname === "/about"}
          to="/about"
        >
          About us
        </Link>
        <Link data-iscurrent={currentLocation.pathname === "/map"} to="/map">
          Map
        </Link>
      </nav>
    </header>
  );
};

const HeaderLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default HeaderLayout;
