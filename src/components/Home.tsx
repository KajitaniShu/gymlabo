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
import { Preload, ContactShadows, Environment } from '@react-three/drei'
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
      <Environment preset="city" resolution={1024} blur={0.8} />
      <color attach="background" args={["#C9DBB2"]} />
      <ambientLight intensity={2.8}/>

      <Suspense fallback={<Loading />}>
        <CameraManager cameraRef={ref} target={target} setTarget={setTarget} debug={debug}/>
          <Scene
            modelPath={'/gymlabo_sub.glb'}
          />
          <ContactShadows frames={1} opacity={0.05} scale={5} blur={0.5} far={1} resolution={256} color="#000000"/>

          <Content debug={debug}/>
          <Access target={target} />
      </Suspense>
      <Preload all />
    </Canvas> 
    </>
  )
}
