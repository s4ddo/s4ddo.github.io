import React, { createContext, useContext, useState } from "react";

// Create a context
const GlobalContext = createContext();

// Provider component
export const GlobalProvider = ({ children }) => {
    const [globalIntro, setGlobalIntro]      = useState(true);
    const [currentTarget, setCurrentTarget] = useState({x:0, y: 0, z: 5 });

    return (
        <GlobalContext.Provider value={{
            globalIntro,
            setGlobalIntro,
            currentTarget,
            setCurrentTarget
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalContext);