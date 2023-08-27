import { useState, useRef } from 'react'
import HeaderMenu from '../components/HeaderMenu'
import Scene from '../features/Canvas/Scene'
import StageCollision from '../features/Canvas/StageCollision'
import { Physics } from '@react-three/rapier';
import { useHotkeys, useViewportSize  } from '@mantine/hooks';
import Content from '../components/Content'
import { CameraManager } from '../features/Canvas/CameraManager'
import { TargetDetail } from '../components/TargetDetail'
import Access from '../features/Canvas/Access'
import { Loading } from '../features/Canvas/Loading'
import { FC, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { EffectComposer, SMAA, HueSaturation } from '@react-three/postprocessing'
import AutoFocusDOF from '../features/Canvas/AutoFocusDOF'


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
        <EffectComposer disableNormalPass >
          <AutoFocusDOF
            bokehScale={1} //blur scale
            resolution={1024} //resolution (decrease for performance)
            mouseFocus={false} //if false, the center of the screen will be the focus
            focusSpeed={0.05} // milliseconds to focus a new detected mesh
            focalLength={0.001} //how far the focus should go
          />
          <HueSaturation hue={0.05} saturation={0} />
        </EffectComposer>
        <Suspense fallback={<Loading />}>
          <CameraManager cameraRef={ref} target={target} setTarget={setTarget} />
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