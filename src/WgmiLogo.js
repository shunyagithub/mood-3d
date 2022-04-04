/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import { animated, config, useSpring } from '@react-spring/three';
import { useGLTF, useMatcapTexture } from '@react-three/drei';
import React, { useRef } from 'react';

export default function WgmiLogo(props) {
  const group = useRef();
  const { nodes } = useGLTF('/model/wgmi_logo.glb');

  const [matcap] = useMatcapTexture('8194AB_D6DFEB_C0CEDE_B0BFD1', 1024);

  const { position, rotation } = useSpring({
    position: props.active ? [12, 2, -20] : [12, -8, -20],
    rotation: props.active ? [0, Math.PI * 2, 0] : [0, 0, 0],
    config: config.gentle,
  });

  return (
    <animated.group ref={group} {...props} dispose={null} position={position} rotation={rotation}>
      <mesh castShadow receiveShadow geometry={nodes.wgmii_logo.geometry} material={nodes.wgmii_logo.material}>
        <meshMatcapMaterial matcap={matcap} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Curve005.geometry}
          material={nodes.Curve005.material}
          position={[-1.86, -0.71, 0.08]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={16.6}
        >
          <meshMatcapMaterial matcap={matcap} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Curve006.geometry}
          material={nodes.Curve006.material}
          position={[-1.86, -0.71, 0.08]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={16.6}
        >
          <meshMatcapMaterial matcap={matcap} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Curve007.geometry}
          material={nodes.Curve007.material}
          position={[-1.86, -0.71, 0.08]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={16.6}
        >
          <meshMatcapMaterial matcap={matcap} />
        </mesh>
      </mesh>
    </animated.group>
  );
}

useGLTF.preload('/model/wgmi_logo.glb');
