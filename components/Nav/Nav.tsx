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
import { signOut } from "firebase/auth";

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

const POPOVER_TEXT_RESET: string = `Your comments and replies\nare stored in Local Storage\nand can be cleared.`;

export default function Nav(prop: { showAvatar: boolean }): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);
  const handleAvatarClick = (): void => {
    setShowMenu(!showMenu);
  };

  // Context State
  const { allDataValue } = useContext(CommentsContext);
  const [allData, setAllData] = allDataValue;

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
        className={`h-full flex flex-row gap-1 items-center text-lg font-bold md:font-light md:text-sm border-b-4 border-white hover:border-moderateBlue dark:border-darkModeBlue dark:md:border-darkModeCard dark:hover:border-darkModeModerateBlue hover:text-black dark:hover:text-white ${
          router.asPath == props.link &&
          "md:border-moderateBlue md:dark:border-darkModeModerateBlue md:text-black md:dark:text-white"
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
      // Sign out if there a user logged in
      if (user) {
        signOut(auth)
          .then(() => {
            // Sign out successful
          })
          .catch((error) => {
            // An error happenned
            console.log(error);
          });
      }

      // Clear Local Storage
      localStorage.clear();
      window.location.reload();
    };

    function ResetDemoButton(): JSX.Element {
      return (
        <Popover label={POPOVER_TEXT_RESET}>
          <button
            onClick={resetLocalStorage}
            className={
              "w-full flex items-center text-lg font-bold md:font-light md:text-sm md:h-full text-softRed hover:text-paleRed"
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
          // Hide Settings Navlink when user is signed in
          if (item.name === "Settings" && user) {
            return;
          }
          return (
            <NavLink
              key={item.name}
              link={item.link}
              name={item.name}
              newTab={item.newTab}
            />
          );
        })}
        {/* Dynamically show Reset button if content edited */}
        {!loading && allData.showReset && <ResetDemoButton />}
      </>
    );
  }

  function Hamburger(): JSX.Element {
    const { menuValue } = useContext(NavContext);
    const [showMenu, setShowMenu] = menuValue;

    return (
      <div className="md:hidden bg-white dark:bg-darkModeCard z-40">
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
      <div className="h-full hidden md:flex flex-row md:gap-8 lg:gap-10 items-center">
        <NavLinks />
      </div>
    );
  }

  function NavContainer(props: { children: React.ReactNode }): JSX.Element {
    return (
      <div className="min-w-screen w-full sticky top-0 flex flex-row z-10 bg-white dark:bg-darkModeCard shadow-sm">
        <nav className="max-w-[1180px] w-full h-16 md:h-24 relative flex justify-between items-center border-b border-white dark:border-darkModeCard text-grayishBlue dark:text-slate-400 px-8 mx-0 md:min-mx-8 md:mx-auto">
          <div className="h-full flex flex-row gap-4 items-center md:gap-14">
            <Hamburger />
            <Link href={"/"}>
              <div
                className={`w-full h-full flex items-center border-b-4 border-white dark:border-darkModeCard`}
              >
                <h1 className="text-lg text-moderateBlue dark:text-darkModeModerateBlue font-bold">
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
          <AiOutlineLoading3Quarters className="h-full w-full text-moderateBlue" />
        </div>
      </NavContainer>
    );
  }

  // Google Firebase Authentication API
  const [user, loading] = useAuthState(auth);
  if (loading) return <NavLoading />;

  const demoUser = allData.demoUser;
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
            png={png}
            webp={webp}
          />
        </div>
      )}
    </NavContainer>
  );
}
