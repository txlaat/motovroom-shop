"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useCartStore } from "../cartStore";
const products = [
  { id: 101, name: "Honda CBR600RR", specs: "599cc | 119 HP", price: 12000, image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500&q=80" },
  { id: 102, name: "Kawasaki Ninja ZX-10R", specs: "998cc | 203 HP", price: 17500, image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=500&q=80" },
  { id: 103, name: "BMW S1000RR", specs: "999cc | 205 HP", price: 21000, image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500&q=80" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function RaceBikes() {
  const { cartItems, isCartOpen, addToCart, removeFromCart, setIsCartOpen } = useCartStore();

  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-20 selection:bg-red-600 selection:text-white">

      {/* Navbar - Responsive */}
      <nav className="flex justify-between items-center p-4 md:p-6 border-b border-white/10 bg-zinc-950/80 sticky top-0 backdrop-blur-xl z-40 w-full">
        {/* اللوجو صغرناه على الموبايل (text-xl) وفي الكمبيوتر (text-3xl) */}
        <Link href="/" className="text-xl md:text-3xl font-bold tracking-widest cursor-pointer whitespace-nowrap">
          MOTO<span className="text-red-600">Vroom</span>
        </Link>
        
        {/* المسافات والخطوط صغرت على الموبايل */}
        <div className="flex gap-3 md:gap-8 items-center font-bold tracking-wider text-xs md:text-sm">
          <Link href="/store/naked" className="text-zinc-500 hover:text-red-500 transition-colors pb-1">NAKED</Link>
          <Link href="/store/race" className="text-red-500 border-b-2 border-red-500 pb-1">RACE</Link>
          
          <button onClick={() => setIsCartOpen(true)} className="bg-red-600 hover:bg-red-700 px-3 py-1.5 md:px-4 md:py-2 rounded flex items-center gap-1 md:gap-2 transition-all">
            CART <span className="bg-black px-1.5 md:px-2 rounded-full text-[10px] md:text-xs">{cartItems.length}</span>
          </button>
        </div>
      </nav>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden border-b border-white/5"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-zinc-950 z-0" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
            Aero <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Precision</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl tracking-widest uppercase italic">Built for the track. Born for speed.</p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 mt-16">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {products.map(bike => (
             <motion.div 
               key={bike.id} 
               variants={cardVariants}
               className="group relative bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden hover:border-red-500/50 transition-colors duration-500"
             >
               <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
               
               <div className="h-72 overflow-hidden relative z-10 p-4">
                 <img 
                   src={bike.image} 
                   alt={bike.name} 
                   className="w-full h-full object-cover rounded-lg group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 shadow-2xl" 
                 />
               </div>
               
               <div className="p-6 relative z-10">
                 <div className="flex justify-between items-start mb-2">
                   <h3 className="text-2xl font-bold italic">{bike.name}</h3>
                   <span className="text-red-500 font-black text-xl">${bike.price.toLocaleString()}</span>
                 </div>
                 <p className="text-zinc-500 text-sm mb-6 font-mono font-bold tracking-tighter">{bike.specs}</p>
                 
                 <button 
                   onClick={() => addToCart(bike)} 
                   className="w-full relative overflow-hidden bg-white text-black py-3 rounded font-bold uppercase tracking-widest group-hover:text-white transition-colors duration-300"
                 >
                   <span className="absolute inset-0 bg-red-600 w-0 group-hover:w-full transition-all duration-300 ease-out z-0" />
                   <span className="relative z-10">Add to Garage</span>
                 </button>
               </div>
             </motion.div>
          ))}
        </motion.div>
      </div>

      <div className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-zinc-950 border-l border-white/10 z-50 transform transition-transform duration-500 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold tracking-widest">GARAGE</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-zinc-500 hover:text-white text-4xl">&times;</button>
          </div>
          <div className="flex-1 overflow-y-auto flex flex-col gap-4 overflow-x-hidden">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div 
                  key={item.cartItemId}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 50 }}
                  layout
                  className="flex gap-4 items-center bg-zinc-900 p-3 rounded-lg border border-white/5"
                >
                  <img src={item.image} alt={item.name} className="w-24 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">{item.name}</h4>
                    <p className="text-red-500 font-bold">${item.price.toLocaleString()}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.cartItemId)} className="text-zinc-500 hover:text-red-500 p-2 text-xl transition-colors">
                    🗑️
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {isCartOpen && <div className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />}
    </main>
  );
}
