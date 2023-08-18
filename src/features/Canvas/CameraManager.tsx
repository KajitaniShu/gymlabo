import React, { useRef, useState } from 'react'
import { CameraControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'
import { useControls, button } from 'leva'
import path from "../../config/camera.json"

export function CameraManager({cameraRef, target, setTarget}:any) {
  let timer = 0.0;
  
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  /*
  const [datas, set] = useControls(() => ({
    position: [0, 0, 0],
    target: [0, 0, 0],
    rotate: 0,
    button: button((get) => setAutoRotate((_autoRotate) => !_autoRotate))
  }))
  */
  useFrame(({camera}, delta, xrFrame) => {
    // debug 
    /*
    set({
      position:  [camera.position.x, camera.position.y, camera.position.z],
      target:    [cameraRef.current._target.x, cameraRef.current._target.y, cameraRef.current._target.z],
      rotate:    cameraRef.current.azimuthAngle % (2 * Math.PI)
    });
    */
    var index = path.camera_path.findIndex(({triggerAngle}: any) => Math.abs(triggerAngle - cameraRef.current.azimuthAngle) < 0.01);

    // トリガーとなる角度に達した
    if(index >= 0 && target < 0) {
      setTarget(index);           // 注目点を設定
      cameraRef.current?.saveState();   // 移動前のカメラの位置を記録
    }

    if(target >= 0) {
      // 設定ポイントを注目する
      cameraRef.current.setLookAt(
        path.camera_path[target].position[0], path.camera_path[target].position[1], path.camera_path[target].position[2],   // カメラの移動位置
        path.camera_path[target].target[0], path.camera_path[target].target[1], path.camera_path[target].target[2],         // カメラの移動後の注視点 
        true                                                                                                                // 滑らかに移動する: true
      ); 
      
      // 指定時間超えたら
      if(timer > 2) { 
        setTarget(-1);              // 注目点解除
        cameraRef.current?.reset(true);   // カメラをもとの位置に戻す
        timer = 0.0;                // タイマー初期化
      } 
      else timer += delta;
    }
    
    // カメラを回転させる
    if(cameraRef.current.azimuthAngle < 0) cameraRef.current.azimuthAngle += 2 * Math.PI;                                                                   // もし方位角がマイナスになっていたら2πを足す
    if(target < 0) cameraRef.current.azimuthAngle = (cameraRef.current.azimuthAngle + 5 * delta * MathUtils.DEG2RAD * Number(autoRotate)) % (2 * Math.PI);  // 右回転させる
  })

  return (
    <CameraControls ref={cameraRef} />
  )
}
