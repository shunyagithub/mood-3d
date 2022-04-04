import { config, useSpring } from '@react-spring/three';
import { Environment, OrbitControls, PresentationControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';

import InterfacesLogo from './InterfacesLogo';
import Overlay from './Overlay';
import Wgmi from './Wgmi';
import WgmiLogo from './WgmiLogo';
import './styles.css';
import { useControls } from './utils/useControl';

const code = 'wgmi';

export default function App() {
  const [clicked, setClicked] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: null, y: null });

  const store = { clicked, setClicked, ready, setReady };

  const controls = useControls();

  useEffect(() => {
    const pressed = [];
    const downHandler = ({ key }) => {
      pressed.push(key);
      pressed.splice(-code.length - 1, pressed.length - code.length);

      if (pressed.join('').includes(code)) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    window.addEventListener('keydown', downHandler);

    return () => {
      setActive(false);
    };
  }, [setActive]);

  return (
    <div className="App">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [-10, 0, 10], fov: 8 }}>
        <Suspense fallback={null}>
          <OrbitControls enabled={false} />
          <color attach="background" args={['#f0f0f0']} />
          <fog attach="fog" args={['white', 60, 100]} />
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
            <Wgmi rotation={[0, 0, 0]} controls={controls} mousePos={mousePos} />
          </PresentationControls>
          <WgmiLogo active={active} scale={1.8} />
          <InterfacesLogo scale={1} />
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
  useEffect(() => setTimeout(() => set(true), 500), []);
  return useFrame((state) => {
    if (start) {
      setMousePos({ x: state.mouse.x, y: state.mouse.y });
      state.camera.lookAt(0, 0, 0);
      state.camera.fov = 8;
      state.camera.position.lerp(vec.set(-18, 0, 28), 0.05);
    }
  });
}
