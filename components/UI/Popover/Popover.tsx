import { useState } from "react";

export default function Popover(props: {
  children: React.ReactNode;
  label: string;
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
      className="flex md:justify-center items-center relative"
      onMouseOver={togglePopover}
      onMouseLeave={hidePopover}
    >
      {props.children}
      <div
        className={`z-30 w-60 absolute top-16 md:top-8 p-2 rounded-md bg-grayishBlue/80 text-white text-center ${
          showPopover ? "block" : "hidden"
        }`}
      >
        <p className="text-sm whitespace-pre">{props.label}</p>
      </div>
    </div>
  );
}
