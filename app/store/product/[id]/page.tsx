"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { allProducts } from "../../data";
import { useCartStore } from "../../cartStore";

export default function ProductDetails() {
  const params = useParams();
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, addToCart } = useCartStore();

  const bike = allProducts.find((p) => p.id === params.id);

  if (!bike) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl font-bold mb-4">Bike Not Found</h1>
        <Link href="/store/naked" className="text-red-500 border-b border-red-500">Return to Garage</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-red-600 selection:text-white">
      {/* Navbar بسيط للصفحة دي */}
      <nav className="flex justify-between items-center p-6 border-b border-white/10 bg-zinc-950/80 sticky top-0 backdrop-blur-xl z-40">
        <Link href="/" className="text-3xl font-bold tracking-widest cursor-pointer">
          MOTO<span className="text-red-600">Vroom</span>
        </Link>
        <Link href={`/store/${bike.category.toLowerCase()}`} className="text-zinc-500 hover:text-white transition-colors text-sm font-bold tracking-widest uppercase">
          &larr; Back to {bike.category} Bikes
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* صورة المكنة (الناحية الشمال) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6 }}
          className="relative group rounded-2xl overflow-hidden border border-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-red-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          <img src={bike.image} alt={bike.name} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
        </motion.div>

        {/* تفاصيل المكنة (الناحية اليمين) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <div>
            <p className="text-red-500 font-bold tracking-widest uppercase mb-2">{bike.category} CLASS</p>
            <h1 className="text-5xl md:text-6xl font-black italic">{bike.name}</h1>
          </div>
          
          <p className="text-zinc-400 text-lg leading-relaxed border-l-4 border-red-600 pl-4">
            {bike.description}
          </p>

          {/* جدول المواصفات الفنية */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
            <div className="bg-zinc-900/50 p-4 rounded-lg border border-white/5">
              <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase mb-1">Engine</p>
              <p className="text-white font-mono">{bike.engine}</p>
            </div>
            <div className="bg-zinc-900/50 p-4 rounded-lg border border-white/5">
              <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase mb-1">Top Speed</p>
              <p className="text-white font-mono">{bike.topSpeed}</p>
            </div>
            <div className="bg-zinc-900/50 p-4 rounded-lg border border-white/5">
              <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase mb-1">Weight</p>
              <p className="text-white font-mono">{bike.weight}</p>
            </div>
            <div className="bg-zinc-900/50 p-4 rounded-lg border border-white/5">
              <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase mb-1">Power</p>
              <p className="text-white font-mono">{bike.specs.split('|')[1]}</p>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center gap-6">
            <div className="text-4xl font-black text-red-500">
              ${bike.price.toLocaleString()}
            </div>
            <button 
              onClick={() => addToCart(bike)}
              className="w-full md:w-auto flex-1 bg-white text-black py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-colors duration-300"
            >
              Add to Garage
            </button>
          </div>
        </motion.div>
      </div>

      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-zinc-950 border-l border-white/10 z-50 transform transition-transform duration-500 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold tracking-widest">GARAGE</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-zinc-500 hover:text-white text-4xl transition-colors">&times;</button>
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

          {cartItems.length > 0 && (
            <div className="mt-6 border-t border-white/10 pt-6">
              <div className="flex justify-between text-xl font-bold mb-4">
                <span>Total:</span>
                <span className="text-red-500">
                  ${cartItems.reduce((total, item) => total + item.price, 0).toLocaleString()}
                </span>
              </div>
              <Link href="/store/checkout" onClick={() => setIsCartOpen(false)}>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded font-bold uppercase tracking-wider transition-colors">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {isCartOpen && <div className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />}
    </main>
  );
}
