import {useRef, useEffect,memo} from 'react'
import { useGLTF, useFBX, useAnimations } from '@react-three/drei'
import { Group } from 'three'
import { ModelData } from '../interface'

export default memo(function Model({file,action,xyz,rotationY}:ModelData) {
  const group = useRef<Group>(null)
  const glb = useGLTF(file)
  const {animations} = useFBX(action)
  animations[0].name = 'action'
  const {actions} = useAnimations(animations,group)
  useEffect(()=>{
    actions.action?.reset().play()
  },[])

  return (
    <group position-x={xyz['x']} position-y={xyz['y']} position-z={xyz['z']} ref={group}>
      <group rotation-x={ Math.PI * 2 } rotation-y={rotationY}>
        <primitive object={glb.scene} />
      </group>
    </group>
  )
})