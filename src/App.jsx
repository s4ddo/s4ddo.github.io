import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Box(props) {
    const meshRef = useRef();
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    const [position, setPosition] = useState([0, 0, 0]);


    // Use state to track key presses
    const [keyState, setKeyState] = useState({
        W: false,
        A: false,
        S: false,
        D: false,
    });

    // Listen for keydown and keyup events
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'w') setKeyState(prevState => ({ ...prevState, W: true }));
            if (event.key === 'a') setKeyState(prevState => ({ ...prevState, A: true }));
            if (event.key === 's') setKeyState(prevState => ({ ...prevState, S: true }));
            if (event.key === 'd') setKeyState(prevState => ({ ...prevState, D: true }));
        };

        const handleKeyUp = (event) => {
            if (event.key === 'w') setKeyState(prevState => ({ ...prevState, W: false }));
            if (event.key === 'a') setKeyState(prevState => ({ ...prevState, A: false }));
            if (event.key === 's') setKeyState(prevState => ({ ...prevState, S: false }));
            if (event.key === 'd') setKeyState(prevState => ({ ...prevState, D: false }));
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Move the cube based on key presses
    useFrame(() => {
        const speed = 0.05;  // Movement speed
        const newPos = [...position];

        // Update the position based on key states
        if (keyState.W) newPos[2] -= speed;  // Move forward (negative Z)
        if (keyState.A) newPos[0] -= speed;  // Move left (negative X)
        if (keyState.S) newPos[2] += speed;  // Move backward (positive Z)
        if (keyState.D) newPos[0] += speed;  // Move right (positive X)

        setPosition(newPos);  // Update position
    });
    return (
        <mesh
            {...props}
            ref={meshRef}
            position={position}
            scale={active ? 1.5 : 1}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    );
}

function MainThree() {
    return (
        <Canvas style={{ height: "100vh", width: "100vw" }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Box />
            <OrbitControls />
        </Canvas>
    );
}

function Button({text, onClick}) {
    return <div className="button fadein" onClick={onClick}>{text}</div>
}
function Intro(){
    const [clicked, setClicked] = useState(false);
    const setClick = () => setClicked(true);

    return (
        <div className={' titleBox ' + (clicked ? 'disabled' : '' )}>
            <h1 className="fadein title">s4ddo's</h1>
            <h3 className="fadein title">portfolio</h3>
            <Button onClick={setClick} text={"Start"}/>
        </div>
    );
}
function App() {
    return (
        <>
            <Intro />
            <MainThree />
        </>
    );
}

export default App;
