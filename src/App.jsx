import React, { useRef, useState, createRef, useEffect } from 'react';
import './App.css';
import {ThreeCanvas} from './MyThree.jsx';
import {PopUp} from "./Sections.jsx";
import { GlobalProvider, useGlobalState, Sections } from "./GlobalState.jsx";// UX STUFF


export function Intro(){
    const fonts = ['GothamBlack', 'Alagard', 'DM Serif Text']; // List of fonts
    const [currentFontIndex, setCurrentFontIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFontIndex((prevIndex) => (prevIndex + 1) % fonts.length); // Cycle through fonts
        }, 400); // Change every 1 second
        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [fonts.length]);

    return (
        <div className='titleBox'>
            <img style={{
                width: "20%",
                marginLeft: "auto",
                marginRight: "auto",
            }} src={"/cat-spinning.gif"} />
            <h1 className="fadein title"
                style={{ fontFamily: fonts[currentFontIndex], lineHeight: 1}}>
                    s4ddo's
            </h1>
            <h3 className="fadein title">portfolio</h3>
        </div>
    );
}

function AppContent(){
    const {currentSection, setMouse} = useGlobalState();
    const handleMouseMove = (event) => {
        // Normalize mouse position to a range of -1 to 1
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        setMouse({ x, y });
    };

    return (
        <div style={{width: "100%", height: "100%", display: "flex", justifyContent:"center", alignItems: "center"}} onMouseMove={handleMouseMove}>
            {(currentSection !== Sections.Intro) && <PopUp />}
            {(currentSection === Sections.Intro) && <Intro/>}
            <ThreeCanvas />
        </div>
    );
}


function App() {
    return (
        <GlobalProvider style={{width: "100%", height: "100%"}}>
            <AppContent />
        </GlobalProvider>
    );
}

export default App;
