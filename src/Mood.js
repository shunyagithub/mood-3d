/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import { useGLTF } from '@react-three/drei';
import React, { useRef } from 'react';

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/model/MOOD/models/flippers.glb');
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder002.geometry}
        material={nodes.Cylinder002.material}
        position={[0, 1.64, 0]}
        scale={1.14}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder003_1.geometry}
          material={nodes.Cylinder003_1.material}
          position={[0, 0.15, 0]}
          scale={0.78}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder004.geometry}
          material={nodes.Cylinder004.material}
          position={[0, 0.28, 0]}
          scale={0.6}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials.green}
        position={[0, -1.56, 0]}
        scale={0.58}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={nodes.Cylinder.material}
        position={[0, -1.5, 0]}
        scale={1.1}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001.geometry}
          material={nodes.Cylinder001.material}
          position={[0, -0.49, 0]}
          scale={1.01}
        />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.Cube001_1.geometry} material={nodes.Cube001_1.material} />
      <mesh castShadow receiveShadow geometry={nodes.Cube001_2.geometry} material={materials.moutth} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Torus001.geometry}
        material={nodes.Torus001.material}
        position={[0, 0, 1]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={0.27}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Torus002.geometry}
        material={nodes.Torus002.material}
        position={[0, 0, -0.99]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={0.27}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        material={nodes.Sphere.material}
        position={[0, 1.26, 0.26]}
        scale={0.26}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere001.geometry}
        material={nodes.Sphere001.material}
        position={[0, 1.26, -0.26]}
        scale={0.26}
      />
    </group>
  );
}

useGLTF.preload('/model/MOOD/models/flippers.glb');