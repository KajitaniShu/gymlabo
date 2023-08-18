import { useState, useRef } from 'react'
import HeaderMenu from '../components/HeaderMenu'
import Scene from '../features/Canvas/Scene'
import StageCollision from '../features/Canvas/StageCollision'
import { Physics } from '@react-three/rapier';
import { useHotkeys, useViewportSize  } from '@mantine/hooks';
import Content from '../components/Content'
import {OrbitControls } from '@react-three/drei'
import { CameraManager } from '../features/Canvas/CameraManager'
import TargetDetail from '../components/TargetDetail'
import Access from '../features/Canvas/Access'

import { FC, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Sky, Preload, useProgress } from '@react-three/drei'


export function App() {
  const [debug, setDebug] = useState<boolean>(false);
  const { height, width } = useViewportSize();
  const ref = useRef();
  const [target, setTarget] = useState<number>(-1);

  useHotkeys([
    ['alt+shift+D', () => setDebug(!debug)],
  ]);

  return(
    <>
      <HeaderMenu setTarget={setTarget}/>
      <TargetDetail target={target} />
      <Canvas
        style={{
          backgroundColor: "#C9DBB2",
          position: 'absolute',
          top: 0,
          left: 0,
          height: height,
          width: width,
          zIndex: -1
        }}
        camera={{ position: [-3,3,3],  }}
      
      >
        <ambientLight intensity={2}/>
        <directionalLight
          position={[-10,20,0]}
          intensity={3}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          castShadow
        />
        <Suspense fallback={null}>
          <CameraManager cameraRef={ref} target={target} setTarget={setTarget} />
          <Physics debug={debug}>
            <Scene
              modelPath={'/gymlabo_sub.glb'}
            />
            <StageCollision />
            <OrbitControls />
            <Content />
            <Access target={target} />
          </Physics>
        </Suspense>
        <Preload all />
      </Canvas> 
        
    </>
  )
}