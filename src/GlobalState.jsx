import React, { createContext, useContext, useState } from "react";

// Create a context
const GlobalContext = createContext();

// Provider component
export const GlobalProvider = ({ children }) => {
    const [globalIntro, setGlobalIntro]  = useState(true);
    const [currentTarget, setCurrentTarget] = useState({x:0, y: 0, z: 5 });
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [popUpContent, setPopUpContent] = useState({
        title: "Title",
        subtitle: "Subtitle",
        description: "Description",
        domElement: <></>});

    return (
        <GlobalContext.Provider value={{
            globalIntro,
            setGlobalIntro,
            currentTarget,
            setCurrentTarget,
            mouse,
            setMouse,
            popUpContent,
            setPopUpContent,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalContext);