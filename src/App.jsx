import React, { useRef, useState, createRef, useEffect } from 'react';
import './App.css';
import {ThreeCanvas} from './my_three.jsx';
import { GlobalProvider, useGlobalState } from "./GlobalState.jsx";// UX STUFF
function BackButton({text}) {
    const { setGlobalIntro, currentTarget, setCurrentTarget } = useGlobalState();

    const onClick = () => {
        setGlobalIntro(true);
        setCurrentTarget({x:0, y: 0, z: 5 });
    }

    return <div className={`button fadein ${currentTarget.x < 0 ? "" : "right"} `} onClick={onClick}>{text}</div>
}
function Intro(){

    return (
        <div className='titleBox'>
            <h1 className="fadein title">s4ddo's</h1>
            <h3 className="fadein title">portfolio</h3>
        </div>
    );
}

function PopUp({title = 'Title', subtitle = 'Subtitle', description = 'description'}){
    const {currentTarget, popUpContent} = useGlobalState();

    return (<div className={`popup ${currentTarget.x < 0 ? "right fadeinleft" : "fadeinright"}`}>
        <BackButton text={"Back"}/>
        <BackButton text={"Back"}/>
        <h1>{popUpContent.title}</h1>
        <h3>{popUpContent.subtitle}</h3>
        <p>{popUpContent.description}</p>
        <popUpContent.domElement />
    </div>);
}

function AppContent(){
    const {globalIntro, setMouse} = useGlobalState();
    const handleMouseMove = (event) => {
        // Normalize mouse position to a range of -1 to 1
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        setMouse({ x, y });
    };

    return (
        <div onMouseMove={handleMouseMove}>
            {!globalIntro && <PopUp />}
            {globalIntro && <Intro/>}

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
