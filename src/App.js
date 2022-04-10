import { Environment, OrbitControls, PresentationControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';

import Mood from './Mood';
import Overlay from './Overlay';
import Eye from './components/Eye';
import Hat from './components/Hat';
import './styles.css';
import { useControls } from './utils/useControl';

export default function App() {
  const [clicked, setClicked] = useState(false);
  const [ready, setReady] = useState(false);
  const [mousePos, setMousePos] = useState({ x: null, y: null });

  const store = { clicked, setClicked, ready, setReady };

  const controls = useControls();

  const floatDuration = 600;

  return (
    <div className="App">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [10, 0, 20], fov: 5 }}>
        <Suspense fallback={null}>
          <OrbitControls enabled={true} />
          <color attach="background" args={['#888']} />
          <fog attach="fog" args={['white', 70, 100]} />
          <ambientLight intensity={0.9} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 2, tension: 2000 }}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 10, Math.PI / 10]}
            azimuth={[-Math.PI / 10, Math.PI / 10]}
          >
            {/* <Mood rotation={[0, 0, 0]} controls={controls} mousePos={mousePos} /> */}
            <Mood rotation={[0, 0, 0]} controls={controls} floatDuration={floatDuration} />
            <Hat floatDuration={floatDuration} />
            <Eye floatDuration={floatDuration} />
          </PresentationControls>

          <Environment preset="city" />
          <Intro start={ready && clicked} set={setReady} setMousePos={setMousePos} />
        </Suspense>
      </Canvas>
      <Overlay {...store} />
    </div>
  );
}

function Intro({ start, set, setMousePos }) {
  const [vec] = useState(() => new THREE.Vector3());

  useEffect(() => {
    setTimeout(() => set(true), 500);
    return () => {};
  }, [set]);

  return useFrame((state) => {
    if (start) {
      setMousePos({ x: state.mouse.x, y: state.mouse.y });
      state.camera.lookAt(0, 0, 0);
      state.camera.fov = 8;
      state.camera.position.lerp(vec.set(65, 1, 25), 0.01);
    }
  });
}
