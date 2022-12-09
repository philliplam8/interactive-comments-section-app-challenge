import { useContext } from "react";
import { NavContext } from "../../context/NavContext";
import Footer from "../Footer/Footer";
import { NavLink, navLabels } from "./";
import { Drawer } from "../UI/Drawer";

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
            {navLabels.map((item) => {
              return <NavLink key={item} link="/" label={item} />;
            })}
          </div>

          <Footer />
        </div>
      </Drawer>
    </div>
  );
}
