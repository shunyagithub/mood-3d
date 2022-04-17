import { Environment, OrbitControls, PresentationControls, useProgress } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';

import Overlay from './Overlay';
import Texts from './Texts';
import BackTtext from './components/BackText';
import Mood from './components/Mood';
import './styles.css';

const code = 'mood';
const bgColors = ['#DFD3A7', '#C6D1A6', '#E4C1B6', '#C7DFE4', '#C6C9DA'];

export default function App() {
  const [clicked, setClicked] = useState(false);
  const [ready, setReady] = useState(false);
  const [moodActive, setMoodActive] = useState(false);
  // const [mousePos, setMousePos] = useState({ x: null, y: null });

  const [bgColor, setBgColor] = useState('');

  const onChangeBgColor = () => {
    setBgColor(bgColors[Math.floor(Math.random() * bgColors.length)]);
  };

  useEffect(() => {
    onChangeBgColor();
  }, []);

  const store = { clicked, setClicked, ready, setReady };

  return (
    <div className="App">
      <Canvas shadows dpr={[1, 20]} camera={{ position: [40, 3, 5], fov: 8 }} onClick={() => onChangeBgColor()}>
        <Suspense fallback={false}>
          <OrbitControls enabled={false} />
          <color attach="background" args={[bgColor]} />
          <fog attach="fog" args={['white', 100, 100]} />
          <ambientLight intensity={0.9} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />

          <BackTtext />
          <PresentationControls
            global
            config={{ mass: 2, tension: 1000 }}
            snap={{ mass: 2, tension: 1000 }}
            polar={[-Math.PI / 10, Math.PI / 10]}
            azimuth={[-Math.PI / 10, Math.PI / 10]}
          >
            <Mood store={store} active={moodActive} onChangeBgColor={onChangeBgColor} />
          </PresentationControls>

          <Environment preset="city" />
          <KeyPress set={setMoodActive} />
          <Intro start={ready && clicked} set={setReady} />
        </Suspense>
      </Canvas>
      <Texts />
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
      // setMousePos({ x: state.mouse.x, y: state.mouse.y });
      state.camera.lookAt(0, 0, 0);
      state.camera.fov = 3;
      state.camera.position.lerp(vec.set(90, 5, 20), 0.01);
      state.camera.updateProjectionMatrix();
    }
    return null;
  });
}

function KeyPress({ set }) {
  useEffect(() => {
    const pressed = [];
    const downHandler = ({ key }) => {
      pressed.push(key);
      pressed.splice(-code.length - 1, pressed.length - code.length);

      if (pressed.join('').includes(code)) {
        set(true);
      } else {
        set(false);
      }
    };
    window.addEventListener('keydown', downHandler);

    return () => {
      set(false);
    };
  }, [set]);
}
