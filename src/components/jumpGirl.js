import { useEffect,useRef,useState } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { useGLTF, useAnimations,Gltf, useScroll, ScrollControls, SoftShadows, OrbitControls} from "@react-three/drei"
import { EffectComposer, TiltShift2 } from "@react-three/postprocessing"
import "./App.css"
import NavigationControls from "./components/NavigationController"
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { useInput } from "./components/useInput"
import { Environment } from "../Environment"


function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  const obj= useLoader(OBJLoader, require('./'))
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  if(clicked){
      window.open('https://www.palo-it.com/es/');
  }
  
  return (
    <mesh rotation={[1,0,0]}>
    
      <primitive object={obj}></primitive>
    </mesh>
  )
}
function Model(props) {
  const scroll = useScroll();
  const {forward,backward,left,right,jump,shift}=useInput();

  const { nodes, materials, animations } = useGLTF("/jump-transformed.glb")
  const { ref, actions } = useAnimations(animations)
console.log("nodes",nodes, "material, material",materials,"animations", animations)

  const currentAction=useRef("");

  useEffect(()=>{
  let action = "";
  console.log(forward,backward,left,right,jump,shift)
  if(forward || backward || left|| right){
    action="walking";
    if(shift){
      action="running";
    }
  }else if(jump){
    action="jump";
  }
  console.log(currentAction.current)
  console.log(currentAction)
  console.log(action )
  if(currentAction.current!=action){
    const nextActionToPlay= actions[action];
    console.log(actions[action])

    const current=actions[currentAction.current];
    current?.fadeOut(0.3);
    nextActionToPlay?.reset().play();
    currentAction.current=action;
  }
  },[forward,backward,left,right,jump,shift])
  
  useEffect(() => void (actions.jump.reset().play().paused = true), [])
 
  return (
    <group {...props} ref={ref}>
      <primitive object={nodes.mixamorigHips} />
      <skinnedMesh castShadow receiveShadow geometry={nodes.Ch03.geometry} material={materials.Ch03_Body} skeleton={nodes.Ch03.skeleton} />
    </group>
  )
}

export default function App (){
  return(
    <NavigationControls> 
  <Canvas shadows gl={{ antialias: false }} camera={{ position: [1, 0.5, 2.5], fov: 50 }}>
    <color attach="background" args={["#f0f0f0"]} />
    <fog attach="fog" args={["#f0f0f0", 0, 20]} />
    <ambientLight intensity={0.5} />
    <directionalLight intensity={2} position={[-5, 5, 5]} castShadow shadow-mapSize={2048} shadow-bias={-0.0001} />
    <ScrollControls damping={0.2} maxSpeed={0.5} pages={2}>
    
    < Model position={[0, -1, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
    <Environment></Environment>
    </ScrollControls>
   

  <OrbitControls></OrbitControls>
    <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -1.01, 0]} receiveShadow>
      
      <shadowMaterial transparent opacity={0.75} />
    </mesh>
    <SoftShadows size={40} samples={16} />
    <EffectComposer disableNormalPass multisampling={4}>
      <TiltShift2 blur={1} />
    </EffectComposer>
  </Canvas>
</NavigationControls>
)
}