import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";
import { motion } from "motion/react";

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
  const menuDialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const menuDialog = menuDialogRef.current;
    if (!menuDialog) return;

    if (IsMenuOpened && !menuDialog.open) menuDialog.showModal();
    else if (!IsMenuOpened && menuDialog.open) menuDialog.close();
  }, [IsMenuOpened]);
  return (
    <header className="flex py-2 px-4 md:px-12 md:py-3 fixed top-0 left-0 z-10 items-center justify-between w-full bg-white dark:bg-zinc-900">
      <h1 className="text-xl font-semibold italic">JBA</h1>
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
        <motion.dialog
          ref={menuDialogRef}
          initial={{ x: 1200 }}
          animate={{ x: 0 }}
          className="h-screen flex flex-col gap-4 justify-self-end w-54 bg-white text-black dark:bg-black dark:text-white shadow-xl p-4"
        >
          <div className="flex gap-3 items-center justify-end">
            <button
              type="button"
              className=""
              onClick={() => {
                setIsMenuOpened(false);
              }}
            >
              <X />
            </button>
          </div>
          <NavBar className="flex flex-col gap-4 dark:*:border-white/20 *:border-black/20 *:not-last:border-b *:p-1" />
        </motion.dialog>
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
