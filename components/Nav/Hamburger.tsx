import { useContext } from "react";
import { NavContext } from "../../context/NavContext";
import { NavLink, NAV_LINKS } from "./";
import { Drawer } from "../UI/Drawer";
import { Footer } from "../Footer";

export default function Hamburger(): JSX.Element {
  const { menuValue } = useContext(NavContext);
  const [showMenu, setShowMenu] = menuValue;

  return (
    <div className="md:hidden bg-white dark:bg-black z-40">
      <Drawer direction={"left"}>
        <div className="h-full flex flex-col justify-between">
          <div
            className="flex flex-col gap-6"
            onClick={() => setShowMenu(!showMenu)}
          >
            {NAV_LINKS.map((item) => {
              return (
                <NavLink key={item.name} link={item.link} label={item.name} />
              );
            })}
          </div>

          <Footer />
        </div>
      </Drawer>
    </div>
  );
}
