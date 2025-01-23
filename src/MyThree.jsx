import React, {useRef, useState, useMemo} from "react";
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
    const {setCurrentTarget, currentSection} = useGlobalState()

    const [hovered, setHover] = useState(false);
    const [target] = useState(() => new THREE.Object3D())
    const [dragging, setDragging] = useState(false);
    const time = useRef(0); // Track elapsed time
    // Positions
    const [currentPosition, setCurrentPosition] = React.useState(pos); // Initial position
    const [changedPosition, setChangedPosition] = React.useState(pos); // Initial position


    const localRef = useRef();
    const localGroupRef = useRef()

    const { phaseOffset } = useMemo(() => {
        return {
            phaseOffset: Math.random() * Math.PI * 2, // Random phase offset
        };
    }, []);


    useFrame((state, delta) => {
        time.current += delta;

        const maxAngle = Math.PI / 4; // 45 degrees
        localRef.current.rotation.y = maxAngle * Math.sin(time.current + phaseOffset ) * 0.5;

        const bobHeight = Math.sin(time.current + phaseOffset * 2) * 0.2; // Adjust 0.05 to change bob height
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
                    color={dragging ? "cyan" : (hovered ? "yellow" : (!light && currentSection !== Sections.Intro) ? "black" : "white")}
                    emissionIntensity={1}
                    emissive={dragging ? "cyan" : (hovered ? "yellow" : (!light && currentSection !== Sections.Intro) ? "black" : "white")}
                    fontSize={0.25}
                    letterSpacing={0}
                    font={"/alagard.ttf"}
                >
                    {text}
                </Text>



                <DragControls
                    axisLock={"z"}
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
                        scale={0.4}
                        ref={localRef}
                        onClick={clickFunction}
                        onPointerOver={() => setHover(true)}
                        onPointerOut={() => setHover(false)}
                        geometry={nodes[mesh]?.geometry} // Use dynamic bracket notation
                    >
                        <meshStandardMaterial
                            {...materials[mesh]}
                            color={dragging ? "cyan" : (hovered ? "yellow" : "white")}
                        />

                    </mesh>
                </DragControls>


                {(light) && <SpotLight
                    radiusTop={0.1}
                    radiusBottom={2}
                    distance={6}
                    angle={0.6}
                    attenuation={4.5}
                    intensity={200}
                    anglePower={0.3}
                    opacity={0.1}
                    position={[1, 3.5, 1]}
                    target={target}
                    color={"#f4ca90"}
                />}

                <primitive object={target} position={localRef.position}/>


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
            offset = currentTarget.x < 0 ? 1.65 : -1.65;
        }

        if (
            Math.abs(currentTarget.x + offset - camera.x) < 0.01 &&
            Math.abs(currentTarget.y - camera.y) < 0.01 &&
            Math.abs(currentTarget.z / 5 - camera.z) < 0.01
        ) {
            return;
        }
        const speed = 0.05;

        camera.x += (currentTarget.x + offset - camera.x) * speed;
        camera.y += (currentTarget.y - camera.y) * speed;
        camera.z += (currentTarget.z / 5 - camera.z) * speed;
    });

    return (
        <>

            {
                currentSection == Sections.Intro &&
                <>
                <directionalLight intensity={2} color={"cyan"}/>
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
                pos={[2.25, 1.75, -5]}
                mesh_color={"red"}
                mesh={"paper"}
                light={currentSection === Sections.GraphicDesign}
                lineheight={-0.5}
            />
            <Box
                meshRef={(el) => (cubeRefs.current[Sections.Programming] = el)}
                onClick={() => cubeFunc(Sections.Programming)}
                text={Sections.Programming}
                pos={[-2.25, -1.5, -5]}
                mesh_color={"cyan"}
                mesh={"computer"}
                light={currentSection === Sections.Programming}
                lineheight={-1.5}


            />
            <Box
                meshRef={(el) => (cubeRefs.current[Sections.Animations] = el)}
                onClick={() => cubeFunc(Sections.Animations)}
                lineheight={-0.65}
                text={Sections.Animations}
                pos={[-2.25, 1.75, -5]}
                mesh_color={"cyan"}
                mesh={"camera"}
                light={currentSection === Sections.Animations}
            />
            <Box
                meshRef={(el) => (cubeRefs.current[Sections.Games] = el)}
                onClick={() => cubeFunc(Sections.Games)}
                lineheight={-0.85}
                text={Sections.Games}
                pos={[2.25, -1.75, -5]}
                mesh_color={"cyan"}
                mesh={"controller"}
                light={currentSection === Sections.Games}
            />

            <EffectComposer multisampling={0.1}>
                <ChromaticAberration
                    offset={[0.002,0.002]} // chromatic aberration offset
                />

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
        <Canvas className={`my_canvas ${currentSection != Sections.Intro ? "dark" : ""}`}>
            <Scene/>
        </Canvas>
    );
}
