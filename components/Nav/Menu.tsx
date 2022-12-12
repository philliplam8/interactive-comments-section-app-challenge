import { useState, useEffect } from "react";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { Avatar } from "../Avatar";
import { formatId } from "../../utils";
import {
  LoginIcon,
  LogoutIcon,
  SettingsIcon,
  SunIcon,
  MoonIcon,
} from "../UI/Icons";

export default function Menu(props: {
  handleClick: () => void;
  status: boolean;
  currentUser: string;
  png: string;
  webp: string;
}): JSX.Element {
  const [user, loading] = useAuthState(auth);

  const MENU_LINK_OPTIONS = [
    { name: "Settings", link: "/settings" },
    { name: "Display", link: "/" },
    { name: "Sign In", link: "/auth/login" },
    { name: "Sign Out", link: "/auth/logout" },
  ];

  function OptionIcon(props: { option: string }): JSX.Element {
    switch (props.option) {
      case MENU_LINK_OPTIONS[0].name:
        return <SettingsIcon />;
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

  function Option(props: { label: string; link: string }): JSX.Element {
    return (
      <div
        tabIndex={0}
        className={`text-left text-sm font-bold light:hover:text-black dark:hover:text-white`}
        onClick={handleOptionClick}
      >
        <div className="flex flex-row gap-2">
          <div
            id={`option-icon-${formatId(props.label)}`}
            className={`h-5 w-5`}
          >
            <OptionIcon option={props.label} />
          </div>
          <Link
            href={props.link}
            className={
              "w-full border-y-2 border-white hover:border-b-moderateBlue"
            }
          >
            <h3 id={`option-label-${formatId(props.label)}`}>{props.label}</h3>
          </Link>
        </div>
      </div>
    );
  }

  function Options(): JSX.Element {
    return (
      <div className="flex flex-col gap-6 py-2">
        {MENU_LINK_OPTIONS.map((linkOption) =>
          !user && linkOption.name == "Sign Out" ? (
            <></>
          ) : user && linkOption.name === "Sign In" ? (
            <></>
          ) : (
            <Option
              key={linkOption.name}
              label={linkOption.name}
              link={linkOption.link}
            />
          )
        )}
      </div>
    );
  }

  const handleOptionClick = (): void => {
    props.handleClick();
  };

  return (
    <div
      id="profile-menu"
      className="w-full md:w-[280px] absolute top-14 md:top-20 right-0 md:px-0 px-2 sm:px-8 md:mr-2"
    >
      <div
        className={`h-full w-full flex-col font-bold text-sm drop-shadow-3xl z-10 bg-white rounded-lg ${
          props.status ? "flex" : "hidden"
        }`}
      >
        <div className="w-full flex flex-row gap-4 items-center border-b border-lightGray py-5 px-4">
          <Avatar pngSrc={props.png} webpSrc={props.webp} large={true} />
          <div>
            <h3 className="text-darkBlue">{props.currentUser}</h3>
            <h3 className={`text-moderateBlue ${user && "font-medium"}`}>
              {user ? `${user.email}` : "Demo User"}
            </h3>
          </div>
        </div>
        <div className="py-5 px-4">
          <Options />
        </div>
      </div>
    </div>
  );
}
