/* eslint-disable @next/next/no-img-element */
import { useState, useContext, useMemo } from "react";
import Link from "next/link";
import { NavAvatar, NavLinksDesktop, Hamburger } from "./";

export default function Nav(): JSX.Element {
  // const handleAvatarClick = (): void => {
  //   setshowCart(false);
  //   setShowDarkMenu(!showDarkMenu);
  // };

  return (
    <div className="min-w-screen w-full sticky top-0 flex flex-row z-10 bg-white shadow-sm">
      <nav className="max-w-[1180px] w-full h-16 md:h-24 flex justify-between items-center border-b border-white text-grayishBlue px-8 mx-0 md:min-mx-8 md:mx-auto">
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
          <NavAvatar />
        </div>
      </nav>
    </div>
  );
}
