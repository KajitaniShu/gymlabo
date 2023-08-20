import { useGLTF, QuadraticBezierLine, Html, Stage } from '@react-three/drei'
import { Badge, ActionIcon, rem } from '@mantine/core';
import { IconBus, IconWalk } from '@tabler/icons-react';

export default function Access({target}: any) {
  const kokura : any = useGLTF("./kokura.glb");
  const koudaimae : any = useGLTF("./koudaimae.glb");
  
  return (
    <>
    {target === 7 &&
      <group>
        <Html center position={[7, 1.8, 0]}>
          <Badge color="blue" size="lg" variant="dot" bg="white">小倉駅</Badge>
        </Html>
        <Html center position={[-2, 1, 1.3]}>
          <Badge color="green" size="lg" variant="dot" bg="white">GYMLABO</Badge>
        </Html>
        <Html center position={[0, 1, -6]}>
          <Badge color="orange" size="lg" variant="dot" bg="white">九州工大前</Badge>
        </Html>
        <Html center position={[4.5, 0, 0.3]}>
        <Badge color="dark" size="md" py="sm" variant="filled" radius="sm"
            leftSection={
            <ActionIcon size="xs" radius="xl">
              <IconBus size={rem(18)} style={{color: "white"}}/>
            </ActionIcon>
            }
          >約25分</Badge>
        </Html>
        <Html center position={[-0.4, 0, -3.6]}>
          <Badge color="dark" size="md" py="sm" variant="filled" radius="sm"
            leftSection={
            <ActionIcon size="xs" color="dark" radius="xl">
              <IconWalk size={rem(18)} style={{color: "white"}}/>
            </ActionIcon>
            }
          >約5分</Badge>
        </Html>
        <mesh position={[7, 0, 0]} rotation={[0, -Math.PI/2, 0]} scale={[0.4, 0.5, 0.4]}>
          <primitive object={kokura.scene.clone()} />
        </mesh>
        <QuadraticBezierLine 
          start={[0, -0.2, 0]}
          mid={[4, -0.2,   1]}
          end={[8, -0.2, -0.4]}
          lineWidth={3} color="#ABC270" />
        <mesh position={[0, 0, -6]} scale={[0.24, 0.24, 0.24]}>
          <primitive object={koudaimae.scene.clone()} />
        </mesh>
        <QuadraticBezierLine 
          start={[0, -0.2, 0]}
          mid={[-1, -0.2, -3]}
          end={[0, 0, -6]}
          lineWidth={3} color="#ABC270" />
      </group>
    } 
    </>
  )
}
