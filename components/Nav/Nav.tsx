import { getAuth } from "firebase/auth";
import { useState, useContext, useMemo } from "react";
import Link from "next/link";
import { useCommentsData } from "../../hooks/useCommentsData";
import { NavAvatar, NavLinksDesktop, Hamburger, Menu } from "./";

export default function Nav(): JSX.Element {
  // Google Firebase Authentication API
  const auth = getAuth();
  const user = auth.currentUser;
  // React Query
  const { data } = useCommentsData();
  const allData = JSON.parse(data.toString());
  const currentUser = user ? user.displayName : allData.demoUser;
  const avatarImages = allData.users;
  const png = user ? user.photoURL : avatarImages[currentUser].png;
  const webp = user ? user.photoURL : avatarImages[currentUser].webp;

  const [showMenu, setShowMenu] = useState(false);
  const handleAvatarClick = (): void => {
    setShowMenu(!showMenu);
  };

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
      </nav>
    </div>
  );
}
