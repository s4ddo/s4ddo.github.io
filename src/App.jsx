import React, { useRef, useState, createRef, useEffect } from 'react';
import './App.css';
import {ThreeCanvas} from './MyThree.jsx';
import {PopUp, Intro} from "./Sections.jsx";
import { GlobalProvider, useGlobalState, Sections } from "./GlobalState.jsx";// UX STUFF

function AppContent(){
    const {currentSection, setMouse} = useGlobalState();
    const handleMouseMove = (event) => {
        // Normalize mouse position to a range of -1 to 1
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        setMouse({ x, y });
    };

    return (
        <div onMouseMove={handleMouseMove}>
            {(currentSection !== Sections.Intro) && <PopUp />}
            {(currentSection === Sections.Intro) && <Intro/>}
            <ThreeCanvas />
        </div>
    );
}

function App() {
    return (
        <GlobalProvider>
            <AppContent />
        </GlobalProvider>
    );
}

export default App;
