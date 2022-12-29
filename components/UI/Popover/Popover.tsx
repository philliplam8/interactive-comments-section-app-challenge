import { useState } from "react";

export default function Popover(props: {
  children: React.ReactNode;
  label: string;
  width: number;
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
        className={`${
          showPopover ? "visible" : "invisible"
        } z-30 absolute text-center top-16 md:top-8 p-2 rounded-md bg-grayishBlue/80 text-white w-${
          props.width
        }`}
      >
        <p className="text-sm">{props.label}</p>
      </div>
    </div>
  );
}
