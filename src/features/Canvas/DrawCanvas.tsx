import { FC, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Sky, Preload, useProgress } from '@react-three/drei'

const DrawCanvas: FC = ({ children, debug }: any) => {
  const { progress } = useProgress()

  return (
    <>
      <Canvas
        style={{
          backgroundColor: "#C9DBB2",
          position: 'absolute',
          top: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1
        }}
        camera={{ position: [-3,3,3],  }}
        
      >
        <ambientLight intensity={0.5}/>
        <directionalLight
          position={[-10,20,0]}
          intensity={1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          castShadow
        />
        <Suspense fallback={null}>
          {children}
        </Suspense>
        <Preload all />
      </Canvas> 
    </>
  )
}

export default DrawCanvas