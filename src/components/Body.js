/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import { useGLTF } from '@react-three/drei';
import React, { useRef } from 'react';

import { onChangeMesh } from '../hooks/onChangeMesh';

export default function Body({ ready, currentMesh, set }, props) {
  const group = useRef();
  const { nodes } = useGLTF('/model/MOOD/models/flippers.glb');

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Body Scene" onClick={() => onChangeMesh(currentMesh, set)}>
        <mesh
          visible={currentMesh === 0}
          name="body_1"
          castShadow
          receiveShadow
          geometry={nodes.body_1001.geometry}
          material={nodes.body_1001.material}
          position={[0, -0.42, 0]}
        />
        <mesh
          visible={currentMesh === 1}
          name="body_2"
          castShadow
          receiveShadow
          geometry={nodes.body_2.geometry}
          material={nodes.body_2.material}
          position={[0, -1.68, 0]}
          scale={0.92}
        />
        <mesh
          visible={currentMesh === 2}
          name="body_3"
          castShadow
          receiveShadow
          geometry={nodes.body_3.geometry}
          material={nodes.body_3.material}
          position={[0, -1.97, 0]}
        />
        <mesh
          visible={currentMesh === 3}
          name="body_4"
          castShadow
          receiveShadow
          geometry={nodes.body_4.geometry}
          material={nodes.body_4.material}
          position={[0, -2.54, 0]}
          scale={[0.79, 0.92, 0.79]}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/model/MOOD/models/flippers.glb');