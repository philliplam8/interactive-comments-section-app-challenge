import { getAuth } from "firebase/auth";
import { useState, useContext } from "react";
import { NavContext } from "../../context/NavContext";
import Link from "next/link";
import { useCommentsData } from "../../hooks/useCommentsData";
import { NavAvatar, Menu } from "./";
import { Drawer } from "../UI/Drawer";
import { Footer } from "../Footer";
import { OutgoingLink } from "../UI/Icons";

const NAV_LINKS = [
  {
    name: "About",
    link: "/about",
    newTab: false,
  },
  {
    name: "Reset",
    link: "",
    newTab: false,
  },
  {
    name: "Frontend Mentor",
    link: "https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9",
    newTab: true,
  },
];

export default function Nav(): JSX.Element {
  // Google Firebase Authentication API
  const auth = getAuth();
  const user = auth.currentUser;
  // React Query
  const { data } = useCommentsData();
  const allData = JSON.parse(data.toString());
  const currentUser = user ? user.displayName : allData.demoUser;
  const avatarImages = allData.users;
  const png = user ? user.photoURL : avatarImages[currentUser].png;
  const webp = user ? user.photoURL : avatarImages[currentUser].webp;

  const [showMenu, setShowMenu] = useState(false);
  const handleAvatarClick = (): void => {
    setShowMenu(!showMenu);
  };

  function NavLink(props: {
    name: string;
    link: string;
    newTab: boolean;
  }): JSX.Element {
    return (
      <Link
        key={props.link}
        href={props.link}
        className={
          "h-full flex flex-row gap-1 items-center text-lg font-bold md:font-light md:text-sm border-b-4 border-white hover:border-moderateBlue hover:text-black"
        }
        target={props.newTab ? "_blank" : ""}
      >
        {props.name}
        {props.newTab && (
          <div className="flex items-center h-5 w-5 sm:h-4 sm:w-4 ">
            <OutgoingLink />
          </div>
        )}
      </Link>
    );
  }

  function NavLinks(): JSX.Element {
    return (
      <>
        {NAV_LINKS.map((item) => {
          return (
            <NavLink
              key={item.name}
              link={item.link}
              name={item.name}
              newTab={item.newTab}
            />
          );
        })}
      </>
    );
  }

  function Hamburger(): JSX.Element {
    const { menuValue } = useContext(NavContext);
    const [showMenu, setShowMenu] = menuValue;

    return (
      <div className="md:hidden bg-white dark:bg-black z-40">
        <Drawer direction={"left"}>
          <div className="h-full flex flex-col justify-between">
            <div
              className="flex flex-col gap-6"
              onClick={() => setShowMenu(!showMenu)}
            >
              <NavLinks />
            </div>

            <Footer />
          </div>
        </Drawer>
      </div>
    );
  }

  function NavLinksDesktop(): JSX.Element {
    return (
      <div className="h-full hidden md:flex flex-row md:gap-8 lg:gap-10 items-center light:bg-white dark:bg-black">
        <NavLinks />
      </div>
    );
  }

  return (
    <div className="min-w-screen w-full sticky top-0 flex flex-row z-10 bg-white shadow-sm">
      <nav className="max-w-[1180px] w-full h-16 md:h-24 relative flex justify-between items-center border-b border-white text-grayishBlue px-8 mx-0 md:min-mx-8 md:mx-auto">
        <div className="h-full flex flex-row gap-4 items-center md:gap-14">
          <Hamburger />
          <Link href={"/"}>
            <div
              className={`w-full h-full flex items-center border-b-4 border-white`}
            >
              <h1 className="text-lg text-moderateBlue font-bold">
                Interactive Comments
              </h1>
            </div>
          </Link>
          <NavLinksDesktop />
        </div>

        <div className="flex flex-row gap-5 md:gap-10 items-center">
          <NavAvatar png={png} webp={webp} onButtonClick={handleAvatarClick} />
          <Menu
            status={showMenu}
            handleClick={handleAvatarClick}
            currentUser={currentUser}
            png={png}
            webp={webp}
          />
        </div>
      </nav>
    </div>
  );
}
