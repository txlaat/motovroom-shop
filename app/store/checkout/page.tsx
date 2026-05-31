"use client";

import { useState } from "react";
import { useCartStore } from "../cartStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Checkout() {
  const { cartItems, clearCart } = useCartStore();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  // حساب الإجمالي
  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const tax = subtotal * 0.14; // ضريبة 14%
  const total = subtotal + tax;

  // دالة إتمام الدفع الوهمية
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // بنعمل تأخير ثانيتين كأننا بنكلم البنك، وبعدين نفضي السلة ونحوله لصفحة النجاح
    setTimeout(() => {
      clearCart();
      router.push("/store/success");
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-bold mb-4">Your Garage is Empty</h2>
        <Link href="/store/naked" className="text-red-500 hover:text-red-400 border-b border-red-500 pb-1">
          Go back to store
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white py-12 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <Link href="/store/naked" className="text-zinc-500 hover:text-white mb-8 inline-block transition-colors">
          &larr; Back to Garage
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-12">
          Secure <span className="text-red-600">Checkout</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* فورم البيانات (الناحية الشمال) */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <form onSubmit={handlePayment} className="space-y-6 bg-zinc-900/50 p-8 rounded-xl border border-white/5">
              <h2 className="text-2xl font-bold border-b border-white/10 pb-4 mb-6">Billing Details</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">First Name</label>
                  <input required type="text" className="w-full bg-zinc-950 border border-white/10 rounded p-3 text-white focus:border-red-500 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">Last Name</label>
                  <input required type="text" className="w-full bg-zinc-950 border border-white/10 rounded p-3 text-white focus:border-red-500 outline-none transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">Credit Card Number</label>
                <input required type="text" placeholder="XXXX XXXX XXXX XXXX" maxLength={16} className="w-full bg-zinc-950 border border-white/10 rounded p-3 text-white focus:border-red-500 outline-none transition-colors font-mono" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">Expiry Date</label>
                  <input required type="text" placeholder="MM/YY" maxLength={5} className="w-full bg-zinc-950 border border-white/10 rounded p-3 text-white focus:border-red-500 outline-none transition-colors font-mono" />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">CVV</label>
                  <input required type="password" placeholder="XXX" maxLength={3} className="w-full bg-zinc-950 border border-white/10 rounded p-3 text-white focus:border-red-500 outline-none transition-colors font-mono" />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded font-bold uppercase tracking-widest mt-8 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {isProcessing ? <span className="animate-pulse">Processing...</span> : `Pay $${total.toLocaleString()}`}
              </button>
            </form>
          </motion.div>

          {/* ملخص الفاتورة (الناحية اليمين) */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-zinc-900/50 p-8 rounded-xl border border-white/5 sticky top-24">
              <h2 className="text-2xl font-bold border-b border-white/10 pb-4 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-zinc-950 p-3 rounded border border-white/5">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-10 object-cover rounded" />
                      <span className="font-bold text-sm">{item.name}</span>
                    </div>
                    <span className="text-red-500 font-bold">${item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm text-zinc-400 border-t border-white/10 pt-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (14%)</span>
                  <span className="text-white">${tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-white mt-4 pt-4 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-red-500">${total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
