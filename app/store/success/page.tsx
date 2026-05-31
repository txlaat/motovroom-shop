"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Success() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 overflow-hidden relative">
      
      {/* تأثير إضاءة خافتة في الخلفية لإعطاء طابع بريميوم */}
      <div className="absolute w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] -z-10" />

      <div className="text-center max-w-md w-full space-y-8">
        
        {/* أنيميشن الدائرة وعلامة الصح */}
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
            className="w-24 h-24 bg-red-600/10 border-2 border-red-500 rounded-full flex items-center justify-center relative group"
          >
            {/* توهج داخلي للـ Icon */}
            <div className="absolute inset-0 bg-red-600 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
            
            {/* علامة الصح بتظهر بأنيميشن */}
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-12 h-12 text-red-500 relative z-10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </motion.svg>
          </motion.div>
        </div>

        {/* النصوص بتظهر ورا بعض بنعومة (Staggered Effect) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="space-y-3"
        >
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
            Order Confirmed!
          </h1>
          <p className="text-red-500 font-mono font-bold tracking-wider text-sm">
            YOUR MACHINE IS READY
          </p>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed px-4">
            تهانينا يا وحش! العملية تمت بنجاح، والموتوسيكل بتاعك اتنقل للجراج الخاص بك وجاهز للانطلاق على الأسفلت.
          </p>
        </motion.div>

        {/* تفاصيل وهمية للطلب بتدي شكل احترافي */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="bg-zinc-900/50 border border-white/5 p-4 rounded-lg font-mono text-xs text-zinc-500 flex justify-between items-center text-left"
        >
          <div>
            <p>Receipt ID: <span className="text-zinc-300">#VRM-{Math.floor(100000 + Math.random() * 900000)}</span></p>
            <p>Payment: <span className="text-zinc-300">Secure Credit Card</span></p>
          </div>
          <div className="text-right">
            <p>Status: <span className="text-green-500 font-bold">PAID</span></p>
            <p>Delivery: <span className="text-zinc-300">Instant</span></p>
          </div>
        </motion.div>

        {/* زرار العودة للمتجر */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="pt-4"
        >
          <Link href="/store/naked">
            <button className="relative overflow-hidden bg-white text-black font-bold uppercase tracking-widest px-8 py-3.5 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-300 w-full md:w-auto">
              Back to Store
            </button>
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
