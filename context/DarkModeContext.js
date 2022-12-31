import { createContext, useEffect, useState } from 'react';

export const DarkModeContext = createContext();

export const DarkModeProvider = props => {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem('theme') === 'dark') {
                return true
            }
            return false
        }
    });

    return (
        <DarkModeContext.Provider value={[darkMode, setDarkMode]}>
            {props.children}
        </DarkModeContext.Provider>
    )

}