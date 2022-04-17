import { a, config, easings, useSpring } from '@react-spring/three';
import { useGLTF } from '@react-three/drei';
import { useGesture } from '@use-gesture/react';
import { useCallback, useEffect, useState } from 'react';
import { proxy, useSnapshot } from 'valtio';

import { onGetRandomMaterial } from '../hooks/onGetRandomMaterial';
import Body from './Body';
import Eye from './Eye';
import Hat from './Hat';
import Mouth from './Mouth';
import Neck from './Neck';

const state = proxy({
  meshes: {
    hat: 0,
    // eye: 0,
    mouth: 0,
    neck: 0,
    body: 0,
  },
  materials: {
    hat: 'pink',
    mouth: 'blue',
    neck: 'yellow',
    body: 'green',
  },
});

export default function Mood({ store, active }) {
  const snap = useSnapshot(state);

  const [mouthPos, setMouthPos] = useState([0, 0, 0]);
  const [headPos, setHeadPos] = useState([0, 0, 0]);

  const { materials } = useGLTF('/model/MOOD/models/flippers.glb');

  const onSetMeshPosition = useCallback(() => {
    if (snap.meshes.mouth === 0 || snap.meshes.mouth === 2) {
      setMouthPos([0, 0, 0]);
      setHeadPos([0, 0, 0]);
    }

    if (snap.meshes.mouth === 1) {
      setMouthPos([0, -0.36, 0]);
      setHeadPos([0, -0.7, 0]);
    }

    if (snap.meshes.mouth === 3) {
      setMouthPos([0, -0.39, 0]);
      setHeadPos([0, -0.77, 0]);
    }
  }, [snap]);

  const randomMesh = () => {
    state.meshes.hat = Math.floor(Math.random() * 4);
    state.meshes.mouth = Math.floor(Math.random() * 4);
    state.meshes.neck = Math.floor(Math.random() * 4);
    state.meshes.body = Math.floor(Math.random() * 4);
  };

  const randomMaterial = useCallback(() => {
    if (active) {
      setTimeout(() => {
        state.materials.hat = state.materials.mouth = state.materials.neck = state.materials.body = 'black';
      }, 250);
    } else {
      state.materials.hat = onGetRandomMaterial(materials);
      state.materials.mouth = onGetRandomMaterial(materials);
      state.materials.neck = onGetRandomMaterial(materials);
      state.materials.body = onGetRandomMaterial(materials);
    }
  }, [materials, active]);

  const { rotation } = useSpring({
    rotation: active ? [0, Math.PI * 2, 0] : [0, 0, 0],
    config: { ...config.wobbly, duration: 500, easing: easings.easeInOutCirc },
  });

  const bind = useGesture({
    onDrag: () => {},
    onDragEnd: ({ tap }) => {
      if (!tap) {
        randomMaterial();
        randomMesh();
      }
    },
  });

  useEffect(() => {
    onSetMeshPosition();
  }, [onSetMeshPosition]);

  return (
    <a.group rotation={rotation} {...bind()}>
      <group position={headPos}>
        <Hat {...store} currentMesh={snap.meshes.hat} material={materials[snap.materials.hat]} />
        <Eye {...store} currentMesh={snap.meshes.eye} />
      </group>
      <group position={mouthPos}>
        <Mouth {...store} currentMesh={snap.meshes.mouth} material={materials[snap.materials.mouth]} />
      </group>
      <Neck {...store} currentMesh={snap.meshes.neck} material={materials[snap.materials.neck]} />
      <Body {...store} currentMesh={snap.meshes.body} material={materials[snap.materials.body]} />
    </a.group>
  );
}
