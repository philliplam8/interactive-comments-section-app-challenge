import { useContext } from "react";
import { NavContext } from "../../../context/NavContext";
import { CloseButton } from "../Buttons";

type DrawerProps = {
  direction: string;
  children: React.ReactNode;
};

export default function Drawer({
  direction,
  children,
}: DrawerProps): JSX.Element {
  const { menuValue } = useContext(NavContext);
  const [showMenu, setShowMenu] = menuValue;

  const handleMenuClick = (): void => {
    setShowMenu(!showMenu);
  };

  const animateMenu = () => {
    const leftMenu = {
      open: "translate-x-0",
      close: "-translate-x-full",
    };

    const rightMenu = {
      open: "translate-x-0",
      close: "-translate-x-full",
    };

    if (direction === "left") {
      return leftMenu;
    } else {
      return rightMenu;
    }
  };

  return (
    <>
      <button onClick={handleMenuClick}>
        <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 12v3H0v-3h16Zm0-6v3H0V6h16Zm0-6v3H0V0h16Z"
            fill="#69707D"
            fill-rule="evenodd"
          />
        </svg>
      </button>

      <div
        id="menu-backdrop"
        className={`min-w-screen w-screen min-h-screen h-full absolute top-0 bg-grayishBlue/[.9] z-40 ${
          showMenu ? "fixed" : "hidden"
        } ${direction === "left" ? "left-0" : "left-0"}`}
        onClick={handleMenuClick}
      ></div>

      <div
        className={`w-[300px] min-h-screen h-full absolute top-0 px-8 py-6 bg-white dark:bg-black z-50 ease-in-out duration-300 
        ${direction === "left" ? "left-0" : "right-0"}
        ${showMenu ? animateMenu().open : animateMenu().close}
        `}
      >
        <div className={showMenu ? "h-full flex flex-col gap-12" : "hidden"}>
          <div
            id="container-close-btn"
            className={`flex flex-row ${
              direction === "left" ? "justify-start" : "justify-end"
            }`}
          >
            <CloseButton handleClose={handleMenuClick} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
