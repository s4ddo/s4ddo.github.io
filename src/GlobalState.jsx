import React, { createContext, useContext, useState } from "react";

// Create a context
const GlobalContext = createContext();

// Provider component
export const Sections = {
    Intro: "Intro",
    GraphicDesign : "Graphic Design",
    Programming : "Programming",
    General: "General"
}

export const GlobalProvider = ({ children }) => {
    const [globalIntro, setGlobalIntro]  = useState(true);
    const [currentTarget, setCurrentTarget] = useState({x:0, y: 0, z: 5 });

    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    const [currentSection, setCurrentSection] = useState(Sections.Intro);
    const [currentSubSection, setCurrentSubSection] = useState("Overview");

    return (
        <GlobalContext.Provider value={{
            globalIntro,
            setGlobalIntro,

            currentTarget,
            setCurrentTarget,

            mouse,
            setMouse,

            currentSection,
            setCurrentSection,

            currentSubSection,
            setCurrentSubSection
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalContext);