import * as THREE from 'three'
import { Suspense, useState } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { Html, Preload, OrbitControls } from '@react-three/drei'
import { Popconfirm } from 'antd'

const store = [
  { name: 'outside', color: 'lightpink', position: [10, 0, -15], url: 'https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg' , link: 1 },
  { name: 'inside', color: 'lightblue', position: [15, 0, 0], url: 'https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg' , link: 0 }
  
]

function Dome({ name, position, texture, onClick }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      <mesh position={position}>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshBasicMaterial color="white" />
        <Html center>
          <Popconfirm title="Are you sure you want to leave?" onConfirm={onClick} okText="Yes" cancelText="No">
            <a href="#">{name}</a>
          </Popconfirm>
        </Html>
      </mesh>
    </group>
  )
}


function Portals() {
  const [which, set] = useState(0)
  const { link, ...props } = store[which]

 const maps = useLoader(THREE.TextureLoader, store.map((entry) => entry.url)) // prettier-ignore
 const maps2 = useLoader(THREE.TextureLoader, "https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg") // prettier-ignore
 console.log(maps)
 console.log(maps2)
  return <Dome onClick={() => set(link)} {...props} texture={maps[0]} />
}

export default function EscenaInterna() {
  return (
    <Canvas frameloop="demand" camera={{ position: [0, 0, 0.1] }}>
      <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.2} autoRotate={false} rotateSpeed={-0.5} />
      <Suspense fallback={null}>

        <Portals />
      </Suspense>
    </Canvas>
  )
}
