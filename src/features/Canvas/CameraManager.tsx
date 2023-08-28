import React, { useRef, useState } from 'react'
import { CameraControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'
import { useIdle } from '@mantine/hooks';
import { useControls, button } from 'leva'
import * as THREE from 'three'
import path from "../../config/camera.json"

export function CameraManager({cameraRef, target, setTarget, debug}:any) {
  const [debugging, setDebbugging] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [resetPosition, setResetPosition] = useState<THREE.Vector3 | null>(null);
  const [dragging, setDragging]     = useState<boolean>(false);
  const [prevTarget, setPrevTarget] = useState<number>(-1);
  const switchDebugging = () => setDebbugging((prev) => !prev);
  const idle = useIdle(1000);
  let timer = 0.0;

  // カメラの動きが止まった時 → 回転させる
  const onRest = () => {
    cameraRef.current?.removeEventListener( 'rest', onRest );
    setAutoRotate(true);
    setDragging(false);
    if(target !== -1) {
      setResetPosition(null);
      timer = 0.0;                      // タイマー初期化
    }
  }

  // ユーザーがマウス/タッチでカメラの制御を開始したとき。
  cameraRef.current?.addEventListener( 'controlstart', () => {
    cameraRef.current?.removeEventListener( 'rest', onRest );
    setDragging(true);
    setAutoRotate(false);
  } );

  // ユーザーがマウス/タッチでカメラの制御を終了したとき。
  cameraRef.current?.addEventListener( 'controlend', () => {
    if(prevTarget >= 0) setPrevTarget(-1);
    if ( cameraRef.current?.active ) {
      cameraRef.current?.addEventListener( 'rest', onRest );
    } else {
      onRest();
    }
  } );

  // カメラの移動が終了したとき
  cameraRef.current?.addEventListener( 'transitionstart', () => {
    if(dragging) return;
    setAutoRotate(false);
    if(target === -1) cameraRef.current?.addEventListener( 'rest', onRest );
  } );
  
  // debug
  // const [datas, set] = useControls(() => ({
  //   position:         [0, 0, 0],
  //   target:           [0, 0, 0],
  //   rotate:           0,
  //   autoRotate:       autoRotate,
  //   targetNumber:     target,
  //   prevTargetNumber: prevTarget,
  //   button:           button(switchDebugging),
  //   button2:           button(()=>cameraRef.current?.setTarget(10, 0, 0, true))
  // }))
  
  useFrame(({camera}, delta, xrFrame) => {
    if(debug) return;

    // debug 
    // set({
    //   position:         [camera.position.x, camera.position.y, camera.position.z],
    //   target:           [cameraRef.current._target.x, cameraRef.current._target.y, cameraRef.current._target.z],
    //   autoRotate:       autoRotate,
    //   targetNumber:     target,
    //   prevTargetNumber: prevTarget,
    //   rotate:           cameraRef.current.azimuthAngle % (2 * Math.PI),
    // });
    if(debugging) return;
    
    // 現在の角度とトリガー角度の差が0.01以下になった場合，注視点のindexを取得
    var index = autoRotate ? path.camera_path.findIndex(({triggerAngle}: any) => Math.abs(triggerAngle - cameraRef.current.azimuthAngle) < 0.01) : -1;
    
    // トリガーとなる角度に達した
    if(index >= 0 && target < 0 && prevTarget !== index) {
      setTarget(index);                                   // 注目点を設定
      setResetPosition(cameraRef.current.getPosition());  // 移動前のカメラの位置を記録
    }
    if(target >= 0) {
      if(target !== prevTarget) setPrevTarget(target);
      
      // 指定時間超えたら
      if(timer > 3) {
        if(!idle) return;                 // アイドル状態出ない場合はreturn
        setTarget(-1);                    // 注目点解除
        if(resetPosition !== null) {
          cameraRef.current?.setLookAt(
            resetPosition.x, resetPosition.y, resetPosition.z,  // カメラの移動位置
            0, 0, 0,                                            // カメラの移動後の注視点 
            true                                                // 滑らかに移動する: true
          );
        }else{
          cameraRef.current?.setLookAt(   // リセット位置の保存ができていなかった場合は特定の位置に戻す
          path.camera_path[prevTarget].resetPosition[0], path.camera_path[prevTarget].resetPosition[1], path.camera_path[prevTarget].resetPosition[2],    // カメラの移動位置
          0, 0, 0,                                                                                                                            // カメラの移動後の注視点 
          true                                                                                                                                // 滑らかに移動する: true
          );
        }
        cameraRef.current?.addEventListener( 'rest', onRest );
      } 
      else{
        // 設定ポイントに注目する
        cameraRef.current?.setLookAt(
          path.camera_path[target].position[0], path.camera_path[target].position[1], path.camera_path[target].position[2],   // カメラの移動位置
          path.camera_path[target].target[0], path.camera_path[target].target[1], path.camera_path[target].target[2],         // カメラの移動後の注視点 
          true                                                                                                                // 滑らかに移動する: true
        );
        timer += delta;
      }
    }

    // autoRotate = trueの時，カメラを回転させる
    if(autoRotate && target === -1) {
      cameraRef.current.azimuthAngle = (cameraRef.current.azimuthAngle + 5 * delta * MathUtils.DEG2RAD * Number(autoRotate)) % (2 * Math.PI);  // 右回転させる
      if(cameraRef.current.azimuthAngle < 0) cameraRef.current.azimuthAngle += 2 * Math.PI;                                                    // もし方位角がマイナスになっていたら2πを足す
    }
  })

  return (
    <CameraControls ref={cameraRef} enabled={true} makeDefault/>
  )
}
