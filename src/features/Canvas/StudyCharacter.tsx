import React, { useEffect, useRef } from 'react'
import { useGLTF, Shadow } from '@react-three/drei'
import { useSpring, animated, config } from '@react-spring/three'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'


export default function StudyCharacter({path, ...props}: any) {
  const model : any = useGLTF(path);
  const [spring, api] = useSpring(() => ({ 'rotation-y': 0, config: { friction: 10, mass: 4, tension: 1000 } }), [])
  
  useEffect(() => {
    let timer: any;
    let isStudy: boolean = false;
    const nod = () => {
      api.start({ 'rotation-y': isStudy ? 0 : Math.PI/24 });
      if(isStudy) setTimeout(nod, 100);
      else      timer = setTimeout(nod, (1 + Math.random() * 10) * 1000);
      isStudy = !isStudy;
    }
    nod();
    return () => clearTimeout(timer)
  }, [])


  return (
    <group {...props}>
      <animated.group {...spring} >
        <mesh position={[-0.7, 1, 1.3]} rotation-x={-Math.PI/12} rotation-z={Math.PI/12}>
          <primitive object={model.nodes.pen.clone()} />
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
