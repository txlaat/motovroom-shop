"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const products = [
  { id: 1, name: "Benelli S200", category: "Naked", price: 1500, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&q=80" },
  { id: 2, name: "Yamaha MT-09", category: "Naked", price: 9000, image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=500&q=80" },
  { id: 3, name: "Honda CBR600RR", category: "Race", price: 11000, image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500&q=80" },
  { id: 4, name: "Kawasaki Ninja ZX-10R", category: "Race", price: 17000, image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=500&q=80" }
];

export default function Store() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const nakedBikes = products.filter(bike => bike.category === "Naked");
  const raceBikes = products.filter(bike => bike.category === "Race");
  const addToCart = (bike: any) => {
    setCartItems(prev => [...prev, bike]);
    setIsCartOpen(true); 
  };
  const removeFromCart = (indexToRemove: number) => {
    setCartItems(prev => prev.filter((_, index) => index !== indexToRemove));
  };
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-20 relative overflow-hidden">

      <nav className="flex justify-between items-center p-6 border-b border-zinc-800 bg-zinc-950/80 sticky top-0 backdrop-blur-md z-40">
        <h1 className="text-3xl font-bold tracking-widest">
          MOTO<span className="text-red-600">H2</span>
        </h1>
        <div className="flex gap-6 items-center">
          <a href="#naked" className="hover:text-red-500 transition-colors">Naked Bikes</a>
          <a href="#race" className="hover:text-red-500 transition-colors">Race Bikes</a>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-bold flex items-center gap-2 transition-all"
          >
            Cart 🛒 <span className="bg-black px-2 rounded-full text-sm">{cartItems.length}</span>
          </button>
        </div>
      </nav>

      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-zinc-900 border-l border-zinc-800 z-50 transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Your Garage</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-zinc-400 hover:text-white text-3xl">×</button>
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-2">
            {cartItems.length === 0 ? (
              <p className="text-zinc-500 text-center mt-10">Your garage is empty.</p>
            ) : (
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div 
                    key={item.cartItemId}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: 50 }}
                    layout
                    className="flex gap-4 items-center bg-zinc-950 p-3 rounded border border-zinc-800"
                  >
                    <img src={item.image} alt={item.name} className="w-20 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{item.name}</h4>
                      <p className="text-red-500 text-sm">${item.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.cartItemId)} className="text-zinc-500 hover:text-red-500 p-2">
                      🗑️
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          <div className="mt-6 border-t border-zinc-800 pt-6">
            <div className="flex justify-between text-xl font-bold mb-4">
              <span>Total:</span>
              <span className="text-red-500">${totalPrice.toLocaleString()}</span>
            </div>
            <button 
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded font-bold uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={cartItems.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsCartOpen(false)} 
        />
      )}

      <div className="max-w-7xl mx-auto px-6 mt-12">
        
        <section id="naked" className="mb-16">
          <h2 className="text-4xl font-bold border-l-4 border-red-600 pl-4 mb-8">NAKED BIKES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nakedBikes.map(bike => (
              <ProductCard key={bike.id} bike={bike} onAddToCart={() => addToCart(bike)} />
            ))}
          </div>
        </section>

        <section id="race">
          <h2 className="text-4xl font-bold border-l-4 border-red-600 pl-4 mb-8">RACE BIKES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {raceBikes.map(bike => (
              <ProductCard key={bike.id} bike={bike} onAddToCart={() => addToCart(bike)} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
function ProductCard({ bike, onAddToCart }: { bike: any, onAddToCart: () => void }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden group hover:border-red-600/50 transition-all">
      <div className="h-64 overflow-hidden">
        <img 
          src={bike.image} 
          alt={bike.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{bike.name}</h3>
        <p className="text-zinc-400 text-xl mb-6">${bike.price.toLocaleString()}</p>
        <button 
          onClick={onAddToCart}
          className="w-full bg-white text-black hover:bg-red-600 hover:text-white py-3 rounded font-bold uppercase tracking-wider transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
