import { useEffect,useState,Text } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations, useScroll, ScrollControls, SoftShadows, OrbitControls } from "@react-three/drei"
import { EffectComposer, TiltShift2 } from "@react-three/postprocessing"
import "./App.css"
import * as THREE from 'three'
import { Html} from '@react-three/drei'
import { Popconfirm } from 'antd'
import { Environment } from "./Environment"


const store = [

  { name: 'IR A PALO IT', color: 'blue', position: [2, 0, 5], url: 'https://www.palo-it.com/es/' , link: 0 }
  
]

function Model(props) {
  const scroll = useScroll()

  const { scene,nodes, materials, animations } = useGLTF("/logoNuevo.glb")
  const { ref, actions } = useAnimations(animations)
 // useEffect(() => void (actions.jump.reset().play().paused = true), [])
  //useFrame(() => (actions.jump.time = actions.jump.getClip().duration * scroll.offset))
  return (
    <group {...props} ref={ref}>
      <primitive object={scene} />
    
    </group>
  )
}
//<Dome name={"IR A PALO IT"}  position={[2, 0, 5]}  onClick={() => set("https://www.palo-it.com/es/")}></Dome>
function Dome({ name, position, texture, onClick }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[50, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      <mesh position={position}>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshBasicMaterial color="red" />
        <Html center>
          <Popconfirm title="Desea visitar la pagina oficial de PALO IT?" onConfirm={onClick} okText="SI" cancelText="NO">
            <a href="https://www.palo-it.com/es/">{name}</a>
          </Popconfirm>
        </Html>
      </mesh>
    </group>
  )
}

function ModelJump(props) {

  const scroll = useScroll()

  const { nodes, materials, animations } = useGLTF("/jump-transformed.glb")
  const { ref, actions } = useAnimations(animations)
console.log("nodes",nodes, "material, material",materials,"animations", animations)


  useEffect(() => void (actions.jump.reset().play().paused = true), [])
  useFrame(() => (actions.jump.time = actions.jump.getClip().duration * scroll.offset))
  
 
 
  return (
    <group {...props} ref={ref}>
      <primitive object={nodes.mixamorigHips} />
      <skinnedMesh castShadow receiveShadow geometry={nodes.Ch03.geometry} material={materials.Ch03_Body} skeleton={nodes.Ch03.skeleton} />
    </group>
  )
}


export default function App() {

  const [which, set] = useState(0)

 // const {  url,link, ...props } = store[which]

  return (
   
    <Canvas shadows gl={{ antialias: false }} camera={{ position: [-12, 5, -4], fov: 80 }}>
    
      <color attach="background" args={["#f0f0f0"]} />
     
       
      <ScrollControls damping={0.2} maxSpeed={0.5} pages={2}>
      
      < Model position={[8,2,0]} rotation={[360, 181, 360]} scale={0.01} />
      <OrbitControls></OrbitControls>
      <ModelJump position={[-8, 0, -4]} rotation={[Math.PI / 2, 0, 14]} scale={0.01} ></ModelJump>
      <Environment color="red"></Environment>
      
      </ScrollControls>
     
  
    <OrbitControls></OrbitControls>
    
    </Canvas>
 
  )
}
