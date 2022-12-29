import { useRouter } from "next/router";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useContext } from "react";
import { NavContext } from "../../context/NavContext";
import { CommentsContext } from "../../context/CommentsContext";
import Link from "next/link";
import { useCommentsData } from "../../hooks/useCommentsData";
import { NavAvatar, Menu } from "./";
import { Drawer } from "../UI/Drawer";
import { Footer } from "../Footer";
import { OutgoingLink } from "../UI/Icons";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Popover } from "../UI/Popover";

const NAV_LINKS = [
  {
    name: "Settings",
    link: "/settings",
    newTab: false,
  },
  {
    name: "Frontend Mentor",
    link: "https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9",
    newTab: true,
  },
];

function NavLink(props: {
  name: string;
  link: string;
  newTab: boolean;
}): JSX.Element {
  // Get the current page route via "router.asPath" and show NavLink selected if current route matches navlink name
  const router = useRouter();

  return (
    <Link
      key={props.link}
      href={props.link}
      className={`h-full flex flex-row gap-1 items-center text-lg font-bold md:font-light md:text-sm border-b-4 border-white hover:border-moderateBlue hover:text-black ${
        router.asPath == props.link && "md:border-moderateBlue md:text-black"
      }`}
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
  const resetLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  function ResetDemoButton(): JSX.Element {
    return (
      <Popover
        width={56}
        label="Submitted comment/reply data is stored in Local Storage and can be cleared"
      >
        <button
          onClick={resetLocalStorage}
          className={
            "w-full flex items-center text-lg font-bold md:font-light md:text-sm border-t-2 py-6 md:border-b-4 md:border-t-0 md:border-transparent md:p-0 md:h-full text-softRed hover:text-paleRed"
          }
        >
          Reset Demo
        </button>
      </Popover>
    );
  }

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
      {/* if local storage, dynamically show button to reset demo here */}
      <ResetDemoButton />
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

function NavContainer(props: { children: React.ReactNode }): JSX.Element {
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
        {props.children}
      </nav>
    </div>
  );
}

function NavLoading(): JSX.Element {
  return (
    <NavContainer>
      <div className="w-8 h-8 md:w-[50px] md:h-[50px] bg-lightGray border-2 rounded-full animate-spin">
        <AiOutlineLoading3Quarters className="h-full w-full" />
      </div>
    </NavContainer>
  );
}

export default function Nav(prop: { showAvatar: boolean }): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);
  const handleAvatarClick = (): void => {
    setShowMenu(!showMenu);
  };

  // Context State
  const { allDataValue } = useContext(CommentsContext);
  const [allData, setAllData] = allDataValue;

  // Google Firebase Authentication API
  const [user, loading] = useAuthState(auth);
  if (loading) return <NavLoading />;

  const demoUser = allData.demoUser;
  const currentUser = user ? user.displayName : demoUser;
  const png = user ? user.photoURL : allData.users[demoUser].png;
  const webp = user ? user.photoURL : allData.users[demoUser].webp;

  return (
    <NavContainer>
      {prop.showAvatar && (
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
      )}
    </NavContainer>
  );
}
