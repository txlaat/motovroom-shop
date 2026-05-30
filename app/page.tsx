"use client";

import { useState, useEffect, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { useRouter } from "next/navigation";

function CameraController({ hasEntered, onZoomComplete }: { hasEntered: boolean, onZoomComplete: () => void }) {
  const { camera } = useThree();

  useEffect(() => {
    if (hasEntered) {
      gsap.to(camera.position, {
        x: 0,
        y: 0.4,
        z: 0.1,
        duration: 4, 
        ease: "power2.inOut",
        onComplete: () => {
          onZoomComplete(); 
        }
      });
    }
  }, [hasEntered, camera, onZoomComplete]);

  return null;
}

function MotorcycleModel() {
  const { scene } = useGLTF('/bike.glb');
  
  return (
    <primitive 
      object={scene} 
      scale={1.5} 
      position={[.4, -1, -1.5]} 
      rotation={[0, 1.3, 0]} 
    />
  );
}

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false); 
  const [showChoices, setShowChoices] = useState(false); 
  const router = useRouter();

  const handleEnter = () => {
    setHasEntered(true); 
    const audio = new Audio("/engine.mp3");
    audio.play().catch((e) => console.log("Audio play error:", e));
  };

  const handleZoomComplete = () => {
    setShowChoices(true); 
  };

  const handleChoice = (path: string) => {

    router.push(path);
  };

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">

      <div className="relative z-10 flex flex-col items-center justify-center">
        
        <h1 className="text-white text-6xl md:text-8xl font-bold tracking-widest mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          MOTO<span className="text-red-600">Vroom</span>
        </h1>

        {!hasEntered && (
          <button
            onClick={handleEnter}
            className="text-white text-2xl tracking-widest border border-white/50 px-10 py-3 hover:bg-white hover:text-black transition-all duration-300 animate-pulse"
          >
            ENTER
          </button>
        )}

        {showChoices && (
          <div className="flex flex-col md:flex-row gap-6 animate-in fade-in zoom-in duration-1000">
            <button
              onClick={() => handleChoice("/store/naked")}
              className="text-white text-xl font-bold border border-white/40 bg-white/5 backdrop-blur-md px-12 py-4 hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-widest"
            >
              Naked Bikes
            </button>
            <button
              onClick={() => handleChoice("/store/race")}
              className="text-white text-xl font-bold border border-red-600 bg-red-600/10 backdrop-blur-md px-12 py-4 hover:bg-red-600 transition-all duration-500 uppercase tracking-widest"
            >
              Race Bikes
            </button>
          </div>
        )}
      </div>

      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${showChoices ? "opacity-0" : "opacity-100"}`}>
        <Canvas camera={{ position: [-1, 1.5, 4], fov: 50 }}>
          <CameraController hasEntered={hasEntered} onZoomComplete={handleZoomComplete} />
          <ambientLight intensity={0.5} />
          <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={5} />
          <spotLight position={[-5, 5, 5]} angle={0.3} penumbra={1} intensity={5} />
          
          <Suspense fallback={null}>
            <MotorcycleModel />
          </Suspense>

          <Environment preset="city" />
        </Canvas>
      </div>
    </main>
  );
}
