import { useRef, useState} from 'react'
import { PivotControls, Html } from '@react-three/drei'
import { Tooltip, ActionIcon, CopyButton } from '@mantine/core';
import * as THREE from 'three'
import NodCharacter from '../features/Canvas/NodCharacter'
import JumpCharacter from '../features/Canvas/JumpCharacter'
import MoveCharacter from '../features/Canvas/MoveCharacter'
import StudyCharacter from '../features/Canvas/StudyCharacter'
import LaptopCharacter from '../features/Canvas/LaptopCharacter'
import PresentationCharacter from '../features/Canvas/PresentationCharacter'
import path from "../config/contents.json"
import { IconCopy, IconCheck } from '@tabler/icons-react';



export default function Content({debug}: any) {
  const ref = useRef<any>();
  const [character, setCharacter] = useState<any>({pos: new THREE.Vector3(0, 0, 0), rot: 0});
  return (
    <>
      {debug && 
        <PivotControls autoTransform scale={0.2} onDrag={(l: THREE.Matrix4, deltaL: THREE.Matrix4, w: THREE.Matrix4, deltaW: THREE.Matrix4) => {
          var vec = new THREE.Vector3();
          var rot = new THREE.Quaternion();
          vec.setFromMatrixPosition(w);
          rot.setFromRotationMatrix(w)
          setCharacter({pos: vec, rot: rot.y});
        }}>
          <Html position={[0, 0, 0]}>
            <CopyButton value={character ? "\"position\": [" + character.pos.x + ", " + character.pos.y + ", " + character.pos.z + "], \n \"rotationY\":" + character.rot + "," : ""}>
              {({ copied, copy }) => (
                <ActionIcon color={copied ? 'teal' : 'dark'} variant="filled" onClick={copy}>
                  {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
                </ActionIcon>
              )}
            </CopyButton>  
          </Html>
          <NodCharacter ref={ref}  position={[0, 0 ,0]} rotation-y={0} path={"/character/character2.glb"} scale={[0.023, 0.023, 0.023]} />
        </PivotControls>
      }


      {/* 頷くキャラクター */}
      {path.nodCharacter.map((item, index) => {
          return (<NodCharacter position={item.position} rotation-y={item.rotationY} path={item.path} scale={item.scale} />)
      })}

      {/* 飛び跳ねるキャラクター */}
      {path.jumpCharacter.map((item, index) => {
          return (<JumpCharacter position={item.position} rotation-y={item.rotationY} path={item.path} scale={item.scale} />)
      })}

      {/* 往復するキャラクター */}
      {path.moveCharacter.map((item, index) => {
          return (<MoveCharacter position={item.position} rotation-y={item.rotationY} path={item.path} scale={item.scale} />)
      })}

      {/* 勉強するキャラクター */}
      {path.studyCharacter.map((item, index) => {
          return (<StudyCharacter position={item.position} rotation-y={item.rotationY} path={item.path} scale={item.scale} />)
      })}

      {/* ノートPCをいじるキャラクター */}
      {path.laptopCharacter.map((item, index) => {
          return (<LaptopCharacter position={item.position} rotation-y={item.rotationY} path={item.path} scale={item.scale} />)
      })}

      {/* プレゼンor講義するキャラクター */}
      {path.presentationCharacter.map((item, index) => {
          return (<PresentationCharacter position={item.position} rotation-y={item.rotationY} path={item.path} scale={item.scale} />)
      })}
    </>
  )
}
