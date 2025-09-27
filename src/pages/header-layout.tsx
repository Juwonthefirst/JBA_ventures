import { useState } from "react";
import { Menu } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";
import SlideInDialog from "@/components/slide-in-dialog";
//import lightLogo from "@/assets/images/light-logo.png";
//import darkLogo from "@/assets/images/dark-logo.png";

const NavBar = ({ className = "" }) => {
  const currentLocation = useLocation();
  return (
    <nav
      className={
        "*:data-[iscurrent=true]:scale-110 *:data-[iscurrent=true]:font-semibold *:data-[iscurrent=true]:text-accent *:data-[iscurrent=false]:opacity-70 *:transition-all *:duration-200" +
        " " +
        className
      }
    >
      <Link data-iscurrent={currentLocation.pathname === "/"} to="/">
        Home
      </Link>
      <Link data-iscurrent={currentLocation.pathname === "/about"} to="/about">
        About us
      </Link>
      <Link data-iscurrent={currentLocation.pathname === "/map"} to="/map">
        Map
      </Link>
    </nav>
  );
};

const Header = () => {
  const [IsMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <header className="flex py-2 px-4 md:px-12 md:py-3 fixed top-0 left-0 z-10 items-center justify-between w-full bg-white dark:bg-black shadow-lg">
      <h1 className="text-xl font-semibold italic text-accent">JBA</h1>
      <NavBar className="text-sm gap-8 lg:mr-12 *:data-[iscurrent=false]:hover:opacity-100 *:data-[iscurrent=false]:hover:scale-105 hidden md:flex" />
      <button
        type="button"
        className="md:hidden p-2"
        onClick={() => {
          setIsMenuOpened(true);
        }}
      >
        <Menu />
      </button>
      {IsMenuOpened && (
        <SlideInDialog
          open={IsMenuOpened}
          onClose={() => {
            setIsMenuOpened(false);
          }}
        >
          <NavBar className="flex flex-col gap-4 dark:*:border-white/20 *:border-black/20 *:not-last:border-b *:p-1" />
        </SlideInDialog>
      )}
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
