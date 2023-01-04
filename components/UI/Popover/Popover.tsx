import { useState } from "react";

export default function Popover(props: {
  children: React.ReactNode;
  label: string;
  position: string;
}): JSX.Element {
  const [showPopover, setShowPopover] = useState(false);

  const togglePopover = (): void => {
    setShowPopover(!showPopover);
  };

  const hidePopover = (): void => {
    setShowPopover(false);
  };

  return (
    <div
      className={"flex flex-col items-end min-[460px]:items-center relative"}
      onMouseOver={togglePopover}
      onMouseLeave={hidePopover}
    >
      <div
        className={`w-60 p-2 absolute rounded-md bg-grayishBlue/80 text-white text-center 
        ${showPopover ? "visible" : "hidden"}
        ${props.position == "bottom" && "top-10 md:top-8"}
        ${props.position == "top" && "bottom-6 w-auto"}`}
      >
        <p className="text-sm whitespace-pre">{props.label}</p>
      </div>

      {props.children}
    </div>
  );
}
