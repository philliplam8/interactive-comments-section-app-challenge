/* eslint-disable @next/next/no-img-element */
import { MouseEventHandler } from "react";
import { Avatar } from "../Avatar";

export default function NavAvatar(props: {
  png: string;
  webp: string;
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  return (
    <div className="h-[35px] w-[35px] md:h-[50px] md:w-[50px]">
      <button
        className={
          "hover:border-moderateBlue border-transparent border-2 rounded-[30px]"
        }
        onClick={props.onButtonClick}
      >
        <Avatar pngSrc={props.png} webpSrc={props.webp} large={true} />
      </button>
    </div>
  );
}
