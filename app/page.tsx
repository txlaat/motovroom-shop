"use client";

import { useState, useEffect, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { useRouter } from "next/navigation";

// Component الكاميرا
// زودنا فيه onZoomComplete عشان يبلغ الموقع إن الحركة خلصت
function CameraController({ hasEntered, onZoomComplete }: { hasEntered: boolean, onZoomComplete: () => void }) {
  const { camera } = useThree();

  useEffect(() => {
    if (hasEntered) {
      gsap.to(camera.position, {
        x: 0,
        y: 0.4,
        z: 0.1,
        duration: 4, // 4 ثواني زووم
        ease: "power2.inOut",
        onComplete: () => {
          onZoomComplete(); // أول ما الـ 4 ثواني يخلصوا، هينفذ الدالة دي
        }
      });
    }
  }, [hasEntered, camera, onZoomComplete]);

  return null;
}

// Component الموتوسيكل - بوقفتك اللي ظبطناها
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
  const [hasEntered, setHasEntered] = useState(false); // هل داس إنتر والزووم بدأ؟
  const [showChoices, setShowChoices] = useState(false); // هل الزووم خلص ونظهر الاختيارات؟
  const router = useRouter();

  const handleEnter = () => {
    setHasEntered(true); // نبدأ الزووم
    const audio = new Audio("/engine.mp3");
    audio.play().catch((e) => console.log("Audio play error:", e));
  };

  const handleZoomComplete = () => {
    setShowChoices(true); // دي اللي هتخفي الموتوسيكل وتظهر الزرارين
  };

  const handleChoice = (path: string) => {
    // هنا هينقله للصفحة على طول بدون زووم تاني
    router.push(path);
  };

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      
      {/* طبقة واجهة المستخدم (اللوجو والزراير) - دي هتفضل دايماً فوق الـ 3D */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* اللوجو هيفضل ثابت ومش هيختفي */}
        <h1 className="text-white text-6xl md:text-8xl font-bold tracking-widest mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          MOTO<span className="text-red-600">Vroom</span>
        </h1>
        
        {/* المرحلة 1: زرار ENTER */}
        {!hasEntered && (
          <button
            onClick={handleEnter}
            className="text-white text-2xl tracking-widest border border-white/50 px-10 py-3 hover:bg-white hover:text-black transition-all duration-300 animate-pulse"
          >
            ENTER
          </button>
        )}

        {/* المرحلة 3: الاختيارات تظهر بعد الزووم */}
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

      {/* مساحة الـ 3D */}
      {/* التريكاية هنا: لو showChoices بقت true، هنخفي الـ Canvas ده كله بـ opacity-0 */}
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