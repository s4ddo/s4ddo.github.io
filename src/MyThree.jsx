import React, {Suspense, useRef, useState} from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, Text  } from "@react-three/drei";
import { GlobalProvider, useGlobalState, Sections } from "./GlobalState.jsx";// UX STUFF

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

function Scene(){
	const cameraRef = useRef();
	const cubeRefs = useRef({});
	const {currentTarget, setCurrentTarget, setCurrentSection, setCurrentSubSection, mouse} = useGlobalState();

	const cubeFunc = (section) => {
		setCurrentSubSection("Overview");
		setCurrentSection(section);
		setCurrentTarget(cubeRefs.current[section].position);
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
				meshRef={(el) => (cubeRefs.current[Sections.GraphicDesign] = el)}
				onClick={() => cubeFunc(Sections.GraphicDesign)}
				text={Sections.GraphicDesign}
				position={[4,0,-5]} />
			<Box
				meshRef={(el) => (cubeRefs.current[Sections.Programming] = el)}
				onClick={() => cubeFunc(Sections.Programming)}
				text={Sections.Programming}
				position={[-4,0,-5]} />
			<Box
				meshRef={(el) => (cubeRefs.current[Sections.General] = el)}
				onClick={() => cubeFunc(Sections.General)}
				text={Sections.General}
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
