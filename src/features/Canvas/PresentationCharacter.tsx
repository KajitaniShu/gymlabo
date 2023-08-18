import React, { useEffect, useRef } from 'react'
import { useGLTF, Shadow } from '@react-three/drei'
import { useSpring, animated, config } from '@react-spring/three'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'


export default function PresentationCharacter({path, ...props}: any) {
  const model : any = useGLTF(path);
  const [spring, api] = useSpring(() => ({ 'rotation-z': 0, config: { friction: 40, mass: 20, tension: 3000 } }), [])

  useEffect(() => {
    let timer: any;
    let isTyping: boolean = false; 
    const typing = () => {
      api.start({ 'rotation-z': isTyping ? 0 : Math.PI/16 });
      isTyping = !isTyping;
      timer = setTimeout(typing, (1 + Math.random() * 10) * 1000);
    }
    typing();
    return () => clearTimeout(timer)
  }, [])


  return (
    <group {...props}>
      <animated.group {...spring} >
        <mesh position={[1.4, 1.1, 0.2]} rotation-z={Math.PI/3} rotation-x={Math.PI/12} >
          <primitive object={model.nodes.hand.clone()} />
        </mesh>
      </animated.group>
      <mesh position={[0, 2.2, 0]} rotation-x={Math.PI/12} rotation-z={Math.PI/12}>
          <primitive object={model.nodes.head.clone()} />
        </mesh>
      <mesh>
        <primitive object={model.nodes.body.clone()} />
      </mesh>
      <Shadow opacity={1.5} scale={[1.7, 1.7, 1.7]} position={[0, -1.5, 0]}/>
    </group>
  )
}
