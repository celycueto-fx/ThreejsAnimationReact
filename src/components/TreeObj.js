import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, ContactShadows } from '@react-three/drei'
import { useControls } from 'leva'

const MODELS = {
  Beech: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-beech/model.gltf',
  Lime: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-lime/model.gltf',
  Spruce: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf'
}

export default function TreeObj() {
  const { model } = useControls({ model: { value: 'Beech', options: Object.keys(MODELS) } })
  return (
    <mesh>
     
        <hemisphereLight color="white" groundColor="blue" intensity={0.05} />
        <spotLight position={[1, 0, 10]} angle={0.15} penumbra={1} />
        <group position={[0, 0, 0]}>
          <Model position={[-1, 0, 0]} url={MODELS[model]} />
          <ContactShadows scale={0.001} blur={1} far={2} />
        </group>
        <OrbitControls />
     
 </mesh>
  )
}

function Model({ url, ...props }) {
  const { scene } = useGLTF(url)
  // <primitive object={...} mounts an already existing object
  return <primitive object={scene} {...props} />
}

// Silently pre-load all models
Object.values(MODELS).forEach(useGLTF.preload)
