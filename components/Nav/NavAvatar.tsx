/* eslint-disable @next/next/no-img-element */
import { MouseEventHandler } from "react";
import { useCommentsData } from "../../hooks/useCommentsData";
import { Avatar } from "../Avatar";

export default function NavAvatar(props: {
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  const { data } = useCommentsData();
  const allData = JSON.parse(data.toString());
  const currentUser = allData.currentUser;
  const avatarImages = allData.users;
  const { png, webp } = avatarImages[currentUser];

  return (
    <div className="h-[35px] w-[35px] md:h-[50px] md:w-[50px]">
      <button
        className={
          "hover:border-moderateBlue border-transparent border-2 rounded-[30px]"
        }
        onClick={props.onButtonClick}
      >
        <Avatar pngSrc={png} webpSrc={webp} large={true} />
      </button>
    </div>
  );
}
