import { useContext, useEffect } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { CommentsContext } from "../../context/CommentsContext";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { Avatar } from "../Avatar";
import { Toggle } from "../UI/Toggle";
import { formatHyphenDelimiters } from "../../utils";
import {
  LoginIcon,
  LogoutIcon,
  SettingsIcon,
  SunIcon,
  MoonIcon,
} from "../UI/Icons";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";
import { MdOutlineManageAccounts } from "react-icons/md";
import { BsMoonStars, BsSun } from "react-icons/bs";

const MENU_LINK_OPTIONS = [
  { name: "Switch Demo User", link: "/settings" },
  { name: "Display", link: "/" },
  { name: "Sign In", link: "/auth/login" },
  { name: "Sign Out", link: "/auth/logout" },
];

function OptionIcon(props: { option: string }): JSX.Element {
  switch (props.option) {
    case MENU_LINK_OPTIONS[0].name:
      return <MdOutlineManageAccounts className="w-[24px] h-[24px]" />;
    case MENU_LINK_OPTIONS[1].name:
      return <SunIcon />;
    case MENU_LINK_OPTIONS[2].name:
      return <LoginIcon />;
    case MENU_LINK_OPTIONS[3].name:
      return <LogoutIcon />;
    default:
      return <></>;
  }
}

export default function Menu(props: {
  handleClick: () => void;
  status: boolean;
  png: string;
  webp: string;
}): JSX.Element {
  // Dark Mode State
  const [darkMode, setDarkMode] = useContext(DarkModeContext);
  // Google Firebase Authentication API
  const [user, loading] = useAuthState(auth);
  // Context State
  const { allDataValue } = useContext(CommentsContext);
  const [allData, setAllData] = allDataValue;
  const currentUser = !loading && user ? user.displayName : allData.demoUser;

  const secondaryInfo = () => {
    // Display secondary info based on the provider used
    switch (user?.providerData[0].providerId) {
      // Gmail - show email
      case "google.com":
        return user.email;
      default:
        return "";
    }
  };

  function ProviderIcon(): JSX.Element {
    // Display icon based on the provider used
    switch (user?.providerData[0].providerId) {
      // Gmail
      case "google.com":
        return <FcGoogle />;
      // Twitter
      case "twitter.com":
        return <AiOutlineTwitter />;
      // Github
      case "github.com":
        return <AiFillGithub className="h-[18px] w-[18px] text-black" />;
      default:
        return <></>;
    }
  }

  function Option(props: { label: string; link: string }): JSX.Element {
    return (
      <div
        tabIndex={0}
        className={`text-left text-sm font-bold light:hover:text-black dark:hover:text-white`}
        onClick={handleOptionClick}
      >
        <div className="flex flex-row gap-2">
          <div
            id={`option-icon-${formatHyphenDelimiters(props.label)}`}
            className={`h-5 w-6`}
          >
            <OptionIcon option={props.label} />
          </div>

          <Link
            href={props.link}
            className={
              "w-full border-y-2 border-white dark:border-darkModeCard hover:border-b-moderateBlue dark:hover:border-b-darkModeModerateBlue"
            }
          >
            <h3 id={`option-label-${formatHyphenDelimiters(props.label)}`}>
              {props.label}
            </h3>
          </Link>
        </div>
      </div>
    );
  }

  function Options(): JSX.Element {
    return (
      <div className="flex flex-col gap-6 py-2">
        {/* Hide demo user options when signed in with live user */}
        {!user && (
          <Option
            key={MENU_LINK_OPTIONS[0].name}
            label={MENU_LINK_OPTIONS[0].name}
            link={MENU_LINK_OPTIONS[0].link}
          />
        )}

        {/* Dark Mode */}
        <div className="flex justify-between">
          <div className="flex flex-row items-center gap-2">
            <div className="w-6 pl-[3px] text-xl hover:animate-pulse">
              {darkMode ? <BsMoonStars /> : <BsSun />}
            </div>
            <h3 onClick={handleDarkModeClick}>
              {darkMode ? "Dark Mode" : "Light Mode"}
              {/* Display Mode */}
            </h3>
          </div>
          <Toggle handleClick={handleDarkModeClick} isToggleOn={darkMode} />
        </div>

        {/* Sign In / Sign Out Links */}
        {!user ? (
          <Option
            key={MENU_LINK_OPTIONS[2].name}
            label={MENU_LINK_OPTIONS[2].name}
            link={MENU_LINK_OPTIONS[2].link}
          />
        ) : (
          <Option
            key={MENU_LINK_OPTIONS[3].name}
            label={MENU_LINK_OPTIONS[3].name}
            link={MENU_LINK_OPTIONS[3].link}
          />
        )}
      </div>
    );
  }

  const handleOptionClick = (): void => {
    props.handleClick();
  };

  /**
   * Uodate the localStorage theme variable when the user clicks on a theme option item
   * (Light Mode, Dark Mode)
   */
  const handleDarkModeClick = (): void => {
    if (darkMode === true) {
      // User chooses Light Mode
      window.localStorage.theme = "light";
    } else {
      // User chooses Dark Mode
      window.localStorage.theme = "dark";
    }
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (
      window.localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      id="profile-menu"
      className="w-[250px] absolute top-14 md:top-20 right-0 md:px-0 px-2 sm:px-8 md:mr-2"
    >
      <div
        className={`h-full w-full flex-col font-bold text-sm drop-shadow-3xl z-10 bg-white dark:bg-darkModeCard rounded-lg border-lightGray/30 md:border-lightGray/10 border-[1px] ${
          props.status ? "flex" : "hidden"
        }`}
      >
        <div className="w-full flex flex-row gap-4 items-center border-b border-lightGray dark:border-slate-400 py-5 px-4">
          <Avatar pngSrc={props.png} webpSrc={props.webp} large={true} />
          <div className="flex flex-col">
            <div className="flex flex-row gap-1 items-center text-moderateBlue">
              <h3 className="text-darkBlue dark:text-slate-400">
                {currentUser}
              </h3>
              {user && <ProviderIcon />}
            </div>
            <h3
              className={`text-moderateBlue dark:text-darkModeModerateBlue ${
                user && "font-medium"
              }`}
            >
              {user ? `${secondaryInfo()}` : "Demo User"}
            </h3>
          </div>
        </div>
        <div className="py-5 px-4">
          <Options />
          {/* <button
            className="w-full h-full py-2 hover:text-moderateBlue"
            onClick={handleDarkModeClick}
          >
            Dark Mode
          </button> */}
        </div>
      </div>
    </div>
  );
}
