import { Environment, OrbitControls, PresentationControls, useProgress } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';

import Overlay from './Overlay';
import Body from './components/Body';
import Eye from './components/Eye';
import Hat from './components/Hat';
import Mouth from './components/Mouth';
import Neck from './components/Neck';
import './styles.css';
import { useControls } from './utils/useControl';

const bgColors = ['#DFD3A7', '#C6D1A6', '#E4C1B6', '#C7DFE4', '#C6C9DA'];

export default function App() {
  const [clicked, setClicked] = useState(false);
  const [ready, setReady] = useState(false);
  const [mousePos, setMousePos] = useState({ x: null, y: null });
  const [bgColor, setBgColor] = useState('');

  const onChangeBgColor = () => {
    setBgColor(bgColors[Math.floor(Math.random() * bgColors.length)]);
  };

  useEffect(() => {
    onChangeBgColor();
  }, []);

  const store = { clicked, setClicked, ready, setReady };

  const controls = useControls();

  return (
    <div className="App">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [10, 0, 20], fov: 5 }}
        style={{ touchAction: 'none !important' }}
        onClick={() => onChangeBgColor()}
      >
        <Suspense fallback={false}>
          <OrbitControls enabled={false} />
          <color attach="background" args={[bgColor]} />
          <fog attach="fog" args={['white', 70, 100]} />
          <ambientLight intensity={0.9} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />

          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 2, tension: 2000 }}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 10, Math.PI / 10]}
            azimuth={[-Math.PI / 10, Math.PI / 10]}
          >
            <Hat {...store} />
            <Eye {...store} />
            <Mouth {...store} />
            <Neck {...store} />
            <Body controls={controls} {...store} />
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
  const { loaded } = useProgress();

  const [vec] = useState(() => new THREE.Vector3());

  useEffect(() => {
    if (!loaded) {
      return;
    }

    set(true);
    return () => {};
  }, [set, loaded]);

  return useFrame((state) => {
    if (start) {
      setMousePos({ x: state.mouse.x, y: state.mouse.y });
      state.camera.lookAt(0, 0, 0);
      state.camera.fov = 8;
      state.camera.position.lerp(vec.set(65, 3, 10), 0.01);
    }
  });
}
