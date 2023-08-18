import React, { useEffect, useRef } from 'react'
import { useGLTF, Shadow } from '@react-three/drei'
import { useSpring, animated, config } from '@react-spring/three'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'


export default function LaptopCharacter({path, ...props}: any) {
  const model : any = useGLTF(path);
  const [spring, api] = useSpring(() => ({ 'position-y': 0, config: { friction: 20, mass: 10, tension: 3000 } }), [])

  useEffect(() => {
    let timer: any;
    let isTyping: boolean = false; 
    const typing = () => {
      api.start({ 'position-y': isTyping ? 0 : 0.1 });
      isTyping = !isTyping;
      timer = setTimeout(typing, (1 + Math.random() * 10) * 1000);
    }
    typing();
    return () => clearTimeout(timer)
  }, [])


  return (
    <group {...props}>
      <animated.group {...spring} >
        <mesh position={[0, 0.4, 2.0]} rotation-x={-Math.PI/12} >
          <primitive object={model.nodes.laptop.clone()} />
        </mesh>
      </animated.group>
      <mesh position={[0, 2.2, 0.4]} rotation-x={Math.PI/12}>
          <primitive object={model.nodes.head.clone()} />
        </mesh>
      <mesh>
        <primitive object={model.nodes.body.clone()} />
      </mesh>
      <Shadow opacity={1.5} scale={[1.7, 1.7, 1.7]} position={[0, -1.5, 1]}/>
    </group>
  )
}
