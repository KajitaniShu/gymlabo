import { FC } from 'react'
import { useGLTF } from '@react-three/drei'

type SceneProps = {
  modelPath: string
}


const Scene: FC<SceneProps> = ({ modelPath }, props) => {
  const gltf = useGLTF(modelPath);

  return (
    <mesh>
      <primitive 
        object={gltf.scene.clone()}
        {...props}
      />
    </mesh>
  )
}

export default Scene