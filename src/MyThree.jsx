import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { CubeTextureLoader } from "three";
import {
  PerspectiveCamera,
  OrbitControls,
  Text,
  Environment,
  Backdrop,
} from "@react-three/drei";
import { GlobalProvider, useGlobalState, Sections } from "./GlobalState.jsx"; // UX STUFF
import {
  EffectComposer,
  Noise,
  DotScreen,
  LensFlare,
  ChromaticAberration,
  Pixelation,
  Scanline,
  Glitch,
} from "@react-three/postprocessing";
import { GlitchMode, BlendFunction } from "postprocessing";

function Box({
  meshRef,
  onClick,
  position = [0, 0, 0],
  text,
  props,
  mesh_color = "orange",
}) {
  const [hovered, setHover] = useState(false);
  const localRef = useRef();
  const localGroupRef = useRef();
  const og_y = position[1];
  const [clock] = useState(() => ({ time: 0 }));

  useFrame((state, delta) => {
    //rotate the mesh around the y-axis

    localRef.current.rotation.y += 0.0025;
    localRef.current.rotation.x += 0.0025;

    clock.time += delta;
    const bobHeight = Math.sin(clock.time * 2) * 0.2; // Adjust 0.05 to change bob height
    localGroupRef.current.position.y = og_y + bobHeight;
  });

  meshRef(localGroupRef.current);

  return (
    <group ref={localGroupRef} position={position}>
      <mesh
        {...props}
        scale={1}
        ref={localRef}
        onClick={onClick}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={hovered ? mesh_color : mesh_color}
          emissive={hovered ? mesh_color : "black"}
          emissiveIntensity={hovered ? 2 : 0}
        />
      </mesh>
      <Text
        position={[0, -1, 0]}
        color="white"
        fontSize={0.15}
        letterSpacing={-0.05}
      >
        {text}
      </Text>
    </group>
  );
}

function Scene() {
  const cameraRef = useRef();
  const cubeRefs = useRef({});
  const {
    currentTarget,
    setCurrentTarget,
    setCurrentSection,
    setCurrentSubSection,
    mouse,
  } = useGlobalState();

  const cubeFunc = (section) => {
    setCurrentSubSection("Overview");
    setCurrentSection(section);
    setCurrentTarget(cubeRefs.current[section].position);
  };

  useFrame(() => {
    if (cameraRef.current) {
      const { x, y } = mouse;
      cameraRef.current.rotation.y = -x * 0.02; // Rotate horizontally
      cameraRef.current.rotation.x = y * 0.02; // Rotate vertically
    }

    const camera = cameraRef.current.position;
    let offset = 0;
    if (currentTarget.x !== 0 || currentTarget.y !== 0) {
      offset = currentTarget.x < 0 ? 2 : -2;
    }

    if (
      Math.abs(currentTarget.x + offset - camera.x) < 0.01 &&
      Math.abs(currentTarget.y - camera.y) < 0.01
    ) {
      console.log("You've reached the target!");
      return;
    }
    const speed = 0.05;

    camera.x += (currentTarget.x + offset - camera.x) * speed;
    camera.y += (currentTarget.y - camera.y) * speed;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
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
        position={[4, 0, -5]}
        mesh_color={"red"}
      />
      <Box
        meshRef={(el) => (cubeRefs.current[Sections.Programming] = el)}
        onClick={() => cubeFunc(Sections.Programming)}
        text={Sections.Programming}
        position={[-4, -1, -5]}
        mesh_color={"cyan"}
      />
      <Box
        meshRef={(el) => (cubeRefs.current[Sections.General] = el)}
        onClick={() => cubeFunc(Sections.General)}
        text={Sections.General}
        position={[-2.5, 2, -5]}
        mesh_color={"orange"}
      />

      <EffectComposer>
        {/* <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.001, 0.002]} // color offset
        /> */}
        <Scanline
          blendFunction={BlendFunction.OVERLAY} // blend mode
          density={1.25} // scanline density
        />
        {/* <DotScreen
          blendFunction={BlendFunction.SOFT_LIGHT} // blend mode
          angle={Math.PI} // angle of the dot pattern
          scale={1} // scale of the dot pattern
        /> */}
        <Noise opacity={0.25} />
      </EffectComposer>
    </>
  );
}

export function ThreeCanvas() {
  return (
    <Canvas style={{ height: "100vh", width: "100vw" }}>
      <Scene />
    </Canvas>
  );
}
