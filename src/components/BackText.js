import { Text } from '@react-three/drei';

export default function BackTtext() {
  return (
    <group position={[-10, 0, -2.2]}>
      <Text
        rotation={[0, Math.PI / 2, 0]}
        fontSize={1.2}
        color="white"
        font="/hind.ttf"
        material-fog={false}
        letterSpacing={0}
        fillOpacity={0.1}
      >
        MOOD
      </Text>
      <Text
        position={[0, -0.9, 0]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={1.2}
        color="white"
        font="/hind.ttf"
        material-fog={false}
        letterSpacing={0}
        fillOpacity={0.1}
      >
        FLIPPERS
      </Text>
    </group>
  );
}
