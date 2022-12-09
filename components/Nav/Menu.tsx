import { useState, useEffect } from "react";
import { Avatar } from "../Avatar";
import { formatId } from "../../helpers";
import { LogoutIcon, SettingsIcon } from "../UI/Icons";

export default function Menu(props: {
  handleClick: () => void;
  status: boolean;
  currentUser: string;
  png: string;
  webp: string;
}): JSX.Element {
  const MENU_LINK_OPTIONS = ["Settings", "Sign out"];

  function OptionIcon(props: { option: string }): JSX.Element {
    switch (props.option) {
      case MENU_LINK_OPTIONS[0]:
        return <SettingsIcon />;
      case MENU_LINK_OPTIONS[1]:
        return <LogoutIcon />;
      default:
        return <></>;
    }
  }

  function Option(props: { label: string }): JSX.Element {
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

          <h3
            id={`option-label-${formatId(props.label)}`}
            className={`w-full border-y-2 border-white hover:border-b-moderateBlue`}
          >
            {props.label}
          </h3>
        </div>
      </div>
    );
  }

  function Options(): JSX.Element {
    return (
      <div className="flex flex-col gap-6 py-2">
        {MENU_LINK_OPTIONS.map((linkOption) => {
          return <Option key={linkOption} label={linkOption} />;
        })}
      </div>
    );
  }

  const handleOptionClick = (): void => {
    props.handleClick();
  };

  return (
    <div
      id="profile-menu"
      className="w-full md:w-[230px] absolute top-20 right-0 md:px-0 px-2 sm:px-8 md:mr-2"
    >
      <div
        className={`h-full w-full flex-col font-bold text-sm shadow-2xl z-10 bg-white rounded-lg ${
          props.status ? "flex" : "hidden"
        }`}
      >
        <div className="w-full flex flex-row gap-4 items-center border-b border-lightGray py-5 px-4">
          <Avatar pngSrc={props.png} webpSrc={props.webp} large={true} />
          <h3>{props.currentUser}</h3>
        </div>
        <div className="py-5 px-4">
          <Options />
        </div>
      </div>
    </div>
  );
}
