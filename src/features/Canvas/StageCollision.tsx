import { FC } from 'react'
import { RigidBody } from "@react-three/rapier";

const StageCollision: FC = () => {
  return (
    <>
      {/* 地面 */}
      <RigidBody colliders="cuboid" type="fixed" rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
        </mesh>
      </RigidBody>
    </>
  )
}
export default StageCollision