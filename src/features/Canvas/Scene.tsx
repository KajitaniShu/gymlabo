import { FC } from 'react'
import { useGLTF } from '@react-three/drei'

type SceneProps = {
  modelPath: string
}


const Scene: FC<SceneProps> = ({ modelPath }, props) => {
  const gltf = useGLTF(modelPath);
  gltf.scene.traverse((object: any) => {
    if (object.isMesh){
      object.castShadow=true;
      object.receiveShadow=true;
    }
  })

  return (
    <mesh {...props}>
      <primitive 
        object={gltf.scene.clone()}
        
      />
    </mesh>
  )
}

export default Scene