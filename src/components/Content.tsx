import React from 'react'
import NodCharacter from '../features/Canvas/NodCharacter'
import JumpCharacter from '../features/Canvas/JumpCharacter'
import MoveCharacter from '../features/Canvas/MoveCharacter'
import StudyCharacter from '../features/Canvas/StudyCharacter'
import LaptopCharacter from '../features/Canvas/LaptopCharacter'
import PresentationCharacter from '../features/Canvas/PresentationCharacter'

export default function Content() {
  return (
    <>
      <NodCharacter position={[0, 0.047, 0]}      rotation-y={Math.PI/3} scale={[0.023, 0.023, 0.023]} path={'/character/character1.glb'} />
      <NodCharacter position={[0.1, 0.047, 0.1]}  rotation-y={Math.PI/2}  scale={[0.023, 0.023, 0.023]} path={'/character/character1.glb'} />
      <NodCharacter position={[0, 0.047, 0.2]}    scale={[0.023, 0.023, 0.023]} path={'/character/character1.glb'} />
      <NodCharacter position={[0.2, 0.047, 0.1]}  scale={[0.023, 0.023, 0.023]} path={'/character/character1.glb'} />
      <NodCharacter position={[0.7, 0.047, 0.4]}  scale={[0.023, 0.023, 0.023]} path={'/character/character1.glb'} />

      <JumpCharacter position={[0.4, 0.047, 0.9]}  scale={[0.023, 0.023, 0.023]} path={'/character/character2.glb'} />
      <JumpCharacter position={[0.1, 0.047, 0.3]}  scale={[0.023, 0.023, 0.023]} path={'/character/character2.glb'} />
      <JumpCharacter position={[0.7, 0.047, 0.7]}  scale={[0.023, 0.023, 0.023]} path={'/character/character2.glb'} />
      <JumpCharacter position={[0.3, 0.047, 0.4]}  scale={[0.023, 0.023, 0.023]} path={'/character/character2.glb'} />
      <JumpCharacter position={[0.5, 0.047, 0.4]}  scale={[0.023, 0.023, 0.023]} path={'/character/character2.glb'} />

      <MoveCharacter position={[0.2, 0.047, 0.8]}  scale={[0.023, 0.023, 0.023]} path={'/character/character3.glb'} />
      <MoveCharacter position={[0.6, 0.047, 0.0]}  scale={[0.023, 0.023, 0.023]} path={'/character/character3.glb'} />
      <MoveCharacter position={[0.0, 0.047, 0.5]}  scale={[0.023, 0.023, 0.023]} path={'/character/character3.glb'} />
      <MoveCharacter position={[0.6, 0.047, 0.3]}  scale={[0.023, 0.023, 0.023]} path={'/character/character3.glb'} />

      <StudyCharacter position={[0.2, 0.047, 0.4]}  scale={[0.023, 0.023, 0.023]} path={'/character/character_study1.glb'} />
      <StudyCharacter position={[0.1, 0.047, 0.2]}  scale={[0.023, 0.023, 0.023]} path={'/character/character_study1.glb'} />

      <LaptopCharacter position={[0.5, 0.28, -0.64]}  scale={[0.023, 0.023, 0.023]} path={'/character/character_laptop1.glb'} />


      <PresentationCharacter position={[2.05, 0.303, 0.25]} rotation-y={Math.PI/2} scale={[0.023, 0.023, 0.023]} path={'/character/character_presentation1.glb'} />
    </>
  )
}
