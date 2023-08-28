import { useState, useRef, Suspense } from 'react'
import Scene from '../features/Canvas/Scene'
import StageCollision from '../features/Canvas/StageCollision'
import { Physics } from '@react-three/rapier';
import Content from '../components/Content'
import { CameraManager } from '../features/Canvas/CameraManager'
import { useViewportSize, useHotkeys  } from '@mantine/hooks';
import Access from '../features/Canvas/Access'
import { Loading } from '../features/Canvas/Loading'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { TargetDetail } from '../components/TargetDetail'
import HeaderMenu from '../components/HeaderMenu'



export default function Home() {
  const ref = useRef();
  const { height, width } = useViewportSize();
  const [target, setTarget] = useState<number>(-1);
  const [debug, setDebug] = useState<boolean>(false);
  useHotkeys([
    ['alt+shift+D', () => setDebug(!debug)],
  ]);

  return (
    <>
    <HeaderMenu setTarget={setTarget}/>
    <TargetDetail target={target} />
      
    <Canvas
      style={{
        backgroundColor: "transparent",
        position: 'absolute',
        top: 0,
        left: 0,
        height: height,
        width: width,
        zIndex: -1
      }}
      camera={{ position: [-3,3,3],  fov: 60}}
    
    >
      <color attach="background" args={["#C9DBB2"]} />
      <ambientLight intensity={2.6}/>
      <directionalLight
        color="white"
        position={[-10,20,0]}
        intensity={2.5}
      />
      <Suspense fallback={<Loading />}>
        <CameraManager cameraRef={ref} target={target} setTarget={setTarget} debug={debug}/>
        <Physics debug={debug}>
          <Scene
            modelPath={'/gymlabo_sub.glb'}
          />
          <StageCollision />
          <Content debug={debug}/>
          <Access target={target} />
        </Physics>
      </Suspense>
      <Preload all />
    </Canvas> 
    </>
  )
}
