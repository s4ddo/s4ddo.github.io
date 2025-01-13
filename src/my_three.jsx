import React, { useRef, useState} from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, Text  } from "@react-three/drei";
import { GlobalProvider, useGlobalState } from "./GlobalState.jsx";// UX STUFF

function Box({meshRef, onClick, position = [0,0,0], text, props}) {
	const [hovered, setHover] = useState(false);
	return (
		<group ref={meshRef} position={position}>
			<mesh
				{...props}
				scale={1}
				onClick={onClick}
				onPointerOver={() => setHover(true)}
				onPointerOut={() => setHover(false)}
			>
				<boxGeometry args={[1, 1, 1]} />
				<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
			</mesh>
			<Text
				position={[0,-1,0]}
				color="white"
				fontSize={0.15}
				letterSpacing={-0.05}>
				{text}
			</Text>
		</group>
	);
}



const Contents = [
	{
		title: "Art",
		subtitle: "Graphic Design and Animations",
		description: "A bunch of artistic projects I worked on over the years.",
		domElement: () => {return <iframe width="560" height="315" src="https://www.youtube.com/embed/yqFCN44x69k?si=QJPHEDjkAV8Na_oD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>;}},
	{
		title: "Programming",
		subtitle: "Programming related projects",
		description: "Projects, from simple games to complex web applications.",
		domElement: () => {return <iframe width="560" height="315" src="https://www.youtube.com/embed/yqFCN44x69k?si=QJPHEDjkAV8Na_oD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>;}},
	{
		title: "General Work",
		subtitle: "Work related achievements",
		description: "Things I achieved while working in various companies.",
		domElement: () => {return <iframe width="560" height="315" src="https://www.youtube.com/embed/yqFCN44x69k?si=QJPHEDjkAV8Na_oD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>;}}
]

function Scene(){
	const [clicked, setClicked] = useState(false);
	const cameraRef = useRef();
	const cubeRefs = useRef([]);
	const {currentTarget, setCurrentTarget, setGlobalIntro, mouse, setPopUpContent} = useGlobalState();

	const cubeFunc = (index) => {
		setPopUpContent(Contents[index]);
		setGlobalIntro(false);
		setClicked(true);
		setCurrentTarget(cubeRefs.current[index].position);
	}

	useFrame(() => {

		if (cameraRef.current) {
			const { x, y } = mouse;
			cameraRef.current.rotation.y = -x * 0.02; // Rotate horizontally
			cameraRef.current.rotation.x = y * 0.02; // Rotate vertically
		}

		const camera = cameraRef.current.position;
		let offset = 0;
		if (currentTarget.x !== 0 || currentTarget.y !==  0){
			offset = ((currentTarget.x < 0) ? 2 : -2);
		}

		if (Math.abs(currentTarget.x + offset - camera.x) < 0.01 &&
			Math.abs(currentTarget.y - camera.y) < 0.01 ) {
			console.log("You've reached the target!");
			return;
		}
		const speed  = 0.05;

		camera.x += (currentTarget.x + offset - camera.x) * speed;
		camera.y += (currentTarget.y - camera.y) * speed;
	});

	return (
		<>
			<ambientLight intensity={0.5} />
			<directionalLight position={[10, 10, 5]} intensity={1} />

			<PerspectiveCamera
				makeDefault
				ref={cameraRef}
				position={[0, 0, 0]}
				fov={70} />
			<Box
				meshRef={(el) => (cubeRefs.current[0] = el)}
				onClick={() => cubeFunc(0)}
				text={"Sigma Boy"}
				position={[4,0,-5]} />
			<Box
				meshRef={(el) => (cubeRefs.current[1] = el)}
				onClick={() => cubeFunc(1)}
				text={"Deez Nuts"}
				position={[-4,0,-5]} />
			<Box
				meshRef={(el) => (cubeRefs.current[2] = el)}
				onClick={() => cubeFunc(2)}
				text={"Sigma Girl"}
				position={[-2.5,2.5,-5]} />

		</>
	);
}

export function ThreeCanvas() {
	return (
		<Canvas style={{ height: "100vh", width: "100vw"}}>
			<Scene/>
		</Canvas>
	);
}
