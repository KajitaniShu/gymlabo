import React, { useEffect, useRef } from 'react'
import { useGLTF, Shadow } from '@react-three/drei'
import { useSpring, animated, config } from '@react-spring/three'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'


export default function NodCharacter({path, ...props}: any) {
  const model : any = useGLTF(path);
  const [spring, api] = useSpring(() => ({ 'rotation-z': 0, config: { friction: 10, mass: 4, tension: 800 } }), [])
  
  useEffect(() => {
    let timer: any;
    let isNod: boolean = false;
    const nod = () => {
      api.start({ 'rotation-z': isNod ? 0 : Math.PI/24 });
      if(isNod) setTimeout(nod, 100);
      else      timer = setTimeout(nod, (1 + Math.random() * 10) * 1000);
      isNod = !isNod;
    }
    nod();
    return () => clearTimeout(timer)
  }, [])


  return (
    <group {...props}>
      <animated.group {...spring} >
        <mesh position={[0, 2.4, 0]}>
          <primitive object={model.nodes.head.clone()} />
        </mesh>
      </animated.group>
      <mesh>
        <primitive object={model.nodes.body.clone()} />
      </mesh>
      <Shadow opacity={1.5} scale={[1.7, 1.7, 1.7]} position={[0, -1.5, 0]}/>
    </group>
  )
}
