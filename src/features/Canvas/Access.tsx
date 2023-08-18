import React from 'react'
import { useGLTF, QuadraticBezierLine, Html } from '@react-three/drei'
import { Badge, ActionIcon, rem } from '@mantine/core';
import { IconBus, IconWalk } from '@tabler/icons-react';

export default function Access({target}: any) {
  const kokura : any = useGLTF("./kokura.glb");
  const koudaimae : any = useGLTF("./koudaimae.glb");
  return (
    <>
    {target === 7 ? 
      <group>
        <Html position={[11, 3.3, -5]}>
          <Badge color="blue" variant="dot" bg="white">小倉駅</Badge>
        </Html>
        <Html position={[-1, 1, 1]}>
          <Badge color="green" variant="dot" bg="white">GYMLABO</Badge>
        </Html>
        <Html position={[0, 2, -10]}>
          <Badge color="orange" variant="dot" bg="white">九州工大前</Badge>
        </Html>
        <Html position={[7, -0.2, -2]}>
          <Badge color="dark" variant="outline" size="lg" bg="white"
            leftSection={
            <ActionIcon size="xs" color="dark" radius="xl">
              <IconBus size={rem(18)} />
            </ActionIcon>
            }
          >約25分</Badge>
        </Html>
        <Html position={[-2, -0.2, -5]}>
          <Badge color="dark" variant="outline" size="lg" bg="white"
            leftSection={
            <ActionIcon size="xs" color="dark" radius="xl">
              <IconWalk size={rem(18)} />
            </ActionIcon>
            }
          >約5分</Badge>
        </Html>
        <mesh position={[12, 0, -5]} rotation={[0, -Math.PI/3, 0]} scale={[0.8, 0.8, 0.8]}>
          <primitive object={kokura.scene.clone()} />
        </mesh>
        <QuadraticBezierLine 
          start={[0, -0.2, 0]}
          mid={[10, -0.2, 0]}
          end={[13, -0.2, -6]}
          lineWidth={3} color="#ff2060" />
        <mesh position={[0, 0, -10]} scale={[0.4, 0.4, 0.4]}>
          <primitive object={koudaimae.scene.clone()} />
        </mesh>
        <QuadraticBezierLine 
          start={[0, -0.2, 0]}
          mid={[-3, -0.2, 0]}
          end={[0, 0, -10]}
          lineWidth={3} color="#ff2060" />
      </group>
    : 
      <></>
    } 
    </>
  )
}
