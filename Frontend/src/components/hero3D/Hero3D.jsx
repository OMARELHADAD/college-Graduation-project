import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'

const AnimatedSphere = () => {
    const sphereRef = useRef()

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()
        sphereRef.current.rotation.x = t * 0.2
        sphereRef.current.rotation.y = t * 0.3
    })

    return (
        <Sphere ref={sphereRef} args={[1, 100, 200]} scale={2.4}>
            <MeshDistortMaterial
                color="#4e54c8"
                attach="material"
                distort={0.4}
                speed={1.5}
                roughness={0.2}
                metalness={0.8}
            />
        </Sphere>
    )
}

const Hero3D = () => {
    return (
        <div style={{ width: '100%', height: '100%', minHeight: '400px' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} color="#8f94fb" intensity={1} />

                <AnimatedSphere />

                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    )
}

export default Hero3D
