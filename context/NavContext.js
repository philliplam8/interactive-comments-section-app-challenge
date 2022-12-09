import { createContext, useState } from "react";

export const NavContext = createContext();

export const NavProvider = (props) => {
    const [menu, setShowMenu] = useState(false);

    return (
        <NavContext.Provider value={{
            menuValue: [menu, setShowMenu]
        }}>
            {props.children}
        </NavContext.Provider>
    )
}
