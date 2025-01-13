import React, { useRef, useState, createRef, useEffect } from 'react';
import './App.css';
import {ThreeCanvas} from './my_three.jsx';
import { GlobalProvider, useGlobalState } from "./GlobalState.jsx";// UX STUFF
function BackButton({text}) {
    const { setGlobalIntro, setCurrentTarget } = useGlobalState();

    const onClick = () => {
        setGlobalIntro(true);
        setCurrentTarget({x:0, y: 0, z: 5 });
    }

    return <div className="button fadein" onClick={onClick}>{text}</div>
}
function Intro(){

    return (
        <div className='titleBox'>
            <h1 className="fadein title">s4ddo's</h1>
            <h3 className="fadein title">portfolio</h3>
        </div>
    );
}

function AppContent(){
    const {globalIntro} = useGlobalState();

    return (
        <>
            <BackButton text={"Back"}/>
            {globalIntro && <Intro/>}
            <ThreeCanvas />
        </>
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
