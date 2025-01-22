import React, {useRef, useState} from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import * as THREE from 'three'
import {DragControls, Environment, PerspectiveCamera, SpotLight, Text, useGLTF} from "@react-three/drei";
import {Sections, useGlobalState} from "./GlobalState.jsx"; // UX STUFF
import {EffectComposer, Noise, ChromaticAberration, Scanline} from "@react-three/postprocessing";
import {BlendFunction} from "postprocessing";

function Box({
                 meshRef,
                 onClick,
                 pos = [0, 0, 0],
                 lineheight = 1,
                 text,
                 light = false,
                 mesh = "paper"
             }) {

    const {nodes, materials} = useGLTF(`/models/${mesh}.glb`);
    const {setCurrentTarget} = useGlobalState()

    const [hovered, setHover] = useState(false);
    const [clock] = useState(() => ({time: 0}));
    const [target] = useState(() => new THREE.Object3D())
    const [dragging, setDragging] = useState(false);

    // Positions
    const [currentPosition, setCurrentPosition] = React.useState(pos); // Initial position
    const [changedPosition, setChangedPosition] = React.useState(pos); // Initial position


    const localRef = useRef();
    const localGroupRef = useRef()

    useFrame((state, delta) => {
        //rotate the mesh around the y-axis

        localRef.current.rotation.y += 0.01;

        clock.time += delta;
        const bobHeight = Math.sin(clock.time * 2) * 0.2; // Adjust 0.05 to change bob height
        localRef.current.position.y = 0 + bobHeight;

    });

    const clickFunction = () => {
        if (dragging) {
            setDragging(false);
            return;
        }

        setCurrentTarget({x: currentPosition[0], y: currentPosition[1], z: currentPosition[2]});

        onClick()
    }
    meshRef(localGroupRef.current);
    return (
            <group ref={localGroupRef} position={changedPosition}>
                <Text
                    position={[0,lineheight,0]}
                    color={dragging ? "yellow" : (hovered ? "cyan" : (light) ? "white" : "black")}
                    emissionIntensity={1}
                    emissive={dragging ? "yellow" : (hovered ? "cyan" : (light) ? "white" : "black")}
                    fontSize={0.25}
                    letterSpacing={0}
                    font={"/alagard.ttf"}
                >
                    {text}
                </Text>



                <DragControls
                    autoTransform={false}
                    onDragStart={() => {
                        setDragging(true)
                        const postion_copy = [...changedPosition];
                        setCurrentPosition(postion_copy);
                    }}
                    onDragEnd={() => {
                        setDragging(false)
                        const postion_copy = [...changedPosition];
                        setCurrentPosition(postion_copy);
                    }}
                    onDrag={(l, _, w) => {
                        const pos = new THREE.Vector3();
                        const rot = new THREE.Quaternion();

                        l.decompose(pos, rot, new THREE.Vector3());
                        const finalPos = [currentPosition[0] + pos.x, currentPosition[1] + pos.y, -5];
                        setChangedPosition(finalPos);
                    }}
                >
                    <mesh
                        scale={0.25}
                        ref={localRef}
                        onClick={clickFunction}
                        onPointerOver={() => setHover(true)}
                        onPointerOut={() => setHover(false)}
                        geometry={nodes[mesh]?.geometry} // Use dynamic bracket notation
                    >
                        <meshStandardMaterial
                            {...materials[mesh]}
                            color={dragging ? "yellow" : (hovered ? "cyan" : "white")}
                        />

                    </mesh>
                </DragControls>


                {(light) && <SpotLight
                    radiusTop={0}
                    radiusBottom={1.5}
                    distance={6}
                    angle={1}
                    attenuation={4.5}
                    intensity={200}
                    anglePower={0.3}
                    opacity={0.1}
                    position={[0, 3.5, 0]}
                    target={target}
                    color={"mediumpurple"}
                />}

                <primitive object={target} position={[0, -1, 0]}/>


            </group>
    );
}

function Scene() {
    const cameraRef = useRef();
    const cubeRefs = useRef({});
    const {
        currentTarget,
        setCurrentTarget,
        currentSection,
        setCurrentSection,
        setCurrentSubSection,
        mouse,
    } = useGlobalState();

    const cubeFunc = (section) => {
        setCurrentSubSection("Overview");
        setCurrentSection(section);
    };

    useFrame(() => {
        if (cameraRef.current) {
            const {x, y} = mouse;
            cameraRef.current.rotation.y = -x * 0.02; // Rotate horizontally
            cameraRef.current.rotation.x = y * 0.02; // Rotate vertically
        }

        const camera = cameraRef.current.position;
        let offset = 0;
        if (currentTarget.x !== 0 || currentTarget.y !== 0) {
            offset = currentTarget.x < 0 ? 1.45 : -1.45;
        }

        if (
            Math.abs(currentTarget.x + offset - camera.x) < 0.01 &&
            Math.abs(currentTarget.y - camera.y) < 0.01 &&
            Math.abs(currentTarget.z / 3 - camera.z) < 0.01
        ) {
            return;
        }
        const speed = 0.05;

        camera.x += (currentTarget.x + offset - camera.x) * speed;
        camera.y += (currentTarget.y - camera.y) * speed;
        camera.z += (currentTarget.z / 3 - camera.z) * speed;
    });

    return (
        <>

            {
                currentSection == Sections.Intro &&
                <>
                <directionalLight intensity={2} color={"white"}/>
                <ambientLight intensity={2} color={"white"}/>
                </>
            }




            <Environment
                background={true} // can be true, false or "only" (which only sets the background) (default: false)
                backgroundBlurriness={0} // optional blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
                backgroundIntensity={1} // optional intensity factor (default: 1, only works with three 0.163 and up)
                backgroundRotation={[0, Math.PI / 2, 0]} // optional rotation (default: 0, only works with three 0.163 and up)
                environmentIntensity={1} // optional intensity factor (default: 1, only works with three 0.163 and up)
                environmentRotation={[0, Math.PI / 2, 0]} // optional rotation (default: 0, only works with three 0.163 and up)
                files={[
                    "noise_overlay.png",
                    "noise_overlay.png",
                    "noise_overlay.png",
                    "noise_overlay.png",
                    "noise_overlay.png",
                    "noise_overlay.png",
                ]}
                path="/"
                preset={null}
                scene={undefined} // adds the ability to pass a custom THREE.Scene, can also be a ref
                encoding={undefined} // adds the ability to pass a custom THREE.TextureEncoding (default: THREE.sRGBEncoding for an array of files and THREE.LinearEncoding for a single texture)
            />

            <PerspectiveCamera
                makeDefault
                ref={cameraRef}
                position={[0, 0, 0]}
                fov={70}
            />
            <Box
                meshRef={(el) => (cubeRefs.current[Sections.GraphicDesign] = el)}
                onClick={() => cubeFunc(Sections.GraphicDesign)}
                text={Sections.GraphicDesign}
                pos={[2.7, 1.75, -5]}
                mesh_color={"red"}
                mesh={"paper"}
                light={currentSection === Sections.GraphicDesign}
                lineheight={-0.5}
            />
            <Box
                meshRef={(el) => (cubeRefs.current[Sections.Programming] = el)}
                onClick={() => cubeFunc(Sections.Programming)}
                text={Sections.Programming}
                pos={[-2.7, -1.5, -5]}
                mesh_color={"cyan"}
                mesh={"computer"}
                light={currentSection === Sections.Programming}
                lineheight={-1}


            />
            <Box
                meshRef={(el) => (cubeRefs.current[Sections.Animations] = el)}
                onClick={() => cubeFunc(Sections.Animations)}
                lineheight={-0.65}
                text={Sections.Animations}
                pos={[-2.7, 1.75, -5]}
                mesh_color={"cyan"}
                mesh={"camera"}
                light={currentSection === Sections.Animations}
            />
            {/*<Box*/}
            {/*  meshRef={(el) => (cubeRefs.current[Sections.General] = el)}*/}
            {/*  onClick={() => cubeFunc(Sections.General)}*/}
            {/*  text={Sections.General}*/}
            {/*  position={[-2.5, 2, -5]}*/}
            {/*  mesh_color={"orange"}*/}
            {/*/>*/}
            <EffectComposer multisampling={0.1}>
                {/*<ChromaticAberration*/}
                {/*    offset={[0.001,0.001]} // chromatic aberration offset*/}
                {/*/>*/}

                <Scanline
                    blendFunction={BlendFunction.OVERLAY} // blend mode
                    density={1.25} // scanline density
                />
                <Noise opacity={0.15}/>
            </EffectComposer>
        </>
    );
}


export function ThreeCanvas() {
    const { currentSection } = useGlobalState();
    return (
        <Canvas style={{background: (currentSection != Sections.Intro ? "black" : "mediumpurple")}} className="my_canvas">
            <Scene/>
        </Canvas>
    );
}
