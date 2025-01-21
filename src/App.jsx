import React, { useRef, useState, createRef, useEffect } from 'react';
import './App.css';
import {ThreeCanvas} from './MyThree.jsx';
import {PopUp} from "./Sections.jsx";
import { GlobalProvider, useGlobalState, Sections } from "./GlobalState.jsx";// UX STUFF


export function Intro(){
    const texts = ['/titles/0.png', '/titles/1.png', '/titles/2.png', '/titles/3.png', '/titles/4.png']; // List of fonts
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length); // Cycle through fonts
        }, 400); // Change every 1 second
        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [texts.length]);

    return (
        <div className='fadein titleBox'>
            <img style={{
                width: "20%",
                marginLeft: "auto",
                marginRight: "auto",
            }} src={"/cat-spinning.gif"} />

            <img style={{
                width: "85%",
                marginLeft: "auto",
                marginRight: "auto",

            }} src={texts[currentTextIndex]} />

            <h3 style={{fontFamily: "Alagard"}} className="title">'s portfolio</h3>
        </div>
    );
}


function Watermark(){
    return (
        <div style={{
            display:"flex",
            alignSelf: "start",
            position:"absolute",
            alignItems: "center",
            width: "inherit",
            marginLeft: "10px"
        }}>
            <img style={{
                width: "5%",
            }} src={"/cat.png"} />
            <p style={{fontFamily: "GothamBlack", color: "magenta"}}>certified s4ddo classic</p>
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
        <div style={{width: "inherit", height: "inherit", display: "flex", justifyContent:"center", alignItems: "center"}} onMouseMove={handleMouseMove}>

            {(currentSection !== Sections.Intro) && <PopUp />}
            {(currentSection === Sections.Intro) && <Intro/>}

            <ThreeCanvas />
            <Watermark />
        </div>
    );
}


function App() {
    return (
        <GlobalProvider style={{width: "inherit", height: "inherit"}}>
            <AppContent />
        </GlobalProvider>
    );
}

export default App;
