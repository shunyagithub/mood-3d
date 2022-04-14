import { a, config, useSpring } from '@react-spring/three';
import { Environment, OrbitControls, PresentationControls, useProgress } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { GenericOptions, useDrag, useGesture } from '@use-gesture/react';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import * as THREE from 'three';

import Overlay from './Overlay';
import Body from './components/Body';
import Eye from './components/Eye';
import Hat from './components/Hat';
import Mouth from './components/Mouth';
import Neck from './components/Neck';
import { onChangeMesh } from './hooks/onChangeMesh';
import './styles.css';
import { useControls } from './utils/useControl';

const bgColors = ['#DFD3A7', '#C6D1A6', '#E4C1B6', '#C7DFE4', '#C6C9DA'];

export default function App() {
  const [clicked, setClicked] = useState(false);
  const [ready, setReady] = useState(false);
  const [mousePos, setMousePos] = useState({ x: null, y: null });
  const [moodActive, setMoodActive] = useState(false);

  const [bgColor, setBgColor] = useState('');

  const [hatMesh, setHatMesh] = useState(0);
  const [eyeMesh, setEyeMesh] = useState(0);
  const [mouthMesh, setMouthMesh] = useState(0);
  const [neckMesh, setNeckMesh] = useState(0);
  const [bodyMesh, setBodyMesh] = useState(0);

  const [mouthPos, setMouthPos] = useState([0, 0, 0]);
  const [headPos, setHeadPos] = useState([0, 0, 0]);

  const onSetMeshPosition = useCallback(() => {
    if (mouthMesh === 0 || mouthMesh === 2) {
      setMouthPos([0, 0, 0]);
      setHeadPos([0, 0, 0]);
    }

    if (mouthMesh === 1) {
      setMouthPos([0, -0.34, 0]);
      setHeadPos([0, -0.69, 0]);
    }

    if (mouthMesh === 3) {
      setMouthPos([0, -0.38, 0]);
      setHeadPos([0, -0.82, 0]);
    }
  }, [mouthMesh]);

  const randomMesh = () => {
    console.log('random mesh');
    onChangeMesh(hatMesh, setHatMesh);
    onChangeMesh(eyeMesh, setEyeMesh);
    onChangeMesh(mouthMesh, setMouthMesh);
    onChangeMesh(neckMesh, setNeckMesh);
    onChangeMesh(bodyMesh, setBodyMesh);
  };

  const bind = useGesture({
    onDrag: () => {},
    onDragEnd: ({ tap }) => {
      if (!tap) randomMesh();
    },
  });

  const code = 'mood';

  useEffect(() => {
    const pressed = [];
    const downHandler = ({ key }) => {
      pressed.push(key);
      pressed.splice(-code.length - 1, pressed.length - code.length);

      if (pressed.join('').includes(code)) {
        setMoodActive(true);
      } else {
        setMoodActive(false);
      }
    };
    window.addEventListener('keydown', downHandler);

    return () => {
      setMoodActive(false);
    };
  }, [setMoodActive]);

  const onChangeBgColor = () => {
    setBgColor(bgColors[Math.floor(Math.random() * bgColors.length)]);
  };

  useEffect(() => {
    onChangeBgColor();
    onSetMeshPosition();
  }, [onSetMeshPosition]);

  const store = { clicked, setClicked, ready, setReady };

  const controls = useControls();

  const { rotation } = useSpring({
    rotation: moodActive ? [0, Math.PI * 2, 0] : [0, 0, 0],
    config: { ...config.wobbly, duration: 300 },
  });

  return (
    <div className="App">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [10, 0, 20], fov: 5 }} onClick={() => onChangeBgColor()}>
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
            polar={[-Math.PI / 10, Math.PI / 10]}
            azimuth={[-Math.PI / 10, Math.PI / 10]}
          >
            <a.group rotation={rotation} {...bind()}>
              <group position={headPos}>
                <Hat {...store} currentMesh={hatMesh} set={setHatMesh} />
                <Eye {...store} currentMesh={eyeMesh} set={setEyeMesh} />
              </group>
              <group position={mouthPos}>
                <Mouth {...store} currentMesh={mouthMesh} set={setMouthMesh} />
              </group>
              <Neck {...store} currentMesh={neckMesh} set={setNeckMesh} />
              <Body controls={controls} {...store} currentMesh={bodyMesh} set={setBodyMesh} />
            </a.group>
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
