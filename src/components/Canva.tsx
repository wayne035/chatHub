import {memo} from 'react'
import { OrbitControls } from '@react-three/drei'
import {Canvas} from '@react-three/fiber'
import {canvaProps} from '../interface'

export default memo(function Canva(props:canvaProps) {
  return (
    <Canvas shadows camera={{position:[0,1,5],fov:30}}>
      <ambientLight/>
      <directionalLight color="#fff" position={[10, 10, 10]} />
      <OrbitControls enableZoom={false} enablePan={false}/>
      {props.children}
    </Canvas>
  )
})