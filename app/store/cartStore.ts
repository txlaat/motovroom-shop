import { create } from 'zustand';

// بنفهم التايب سكريبت شكل البيانات اللي هنخزنها
interface CartState {
  cartItems: any[];
  isCartOpen: boolean;
  addToCart: (bike: any) => void;
  removeFromCart: (cartItemId: string) => void;
  setIsCartOpen: (isOpen: boolean) => void;
}

// هنا بنبني المخزن بتاعنا
export const useCartStore = create<CartState>((set) => ({
  cartItems: [], // السلة في البداية فاضية
  isCartOpen: false, // السلة مقفولة
  
  // دالة الإضافة (بتزود المكنة وتفتح السلة تلقائي)
  addToCart: (bike) => set((state) => ({
    // بندي لكل منتج id مميز عشان الأنيميشن يشتغل صح لما نيجي نمسح
    cartItems: [...state.cartItems, { ...bike, cartItemId: Math.random().toString(36).substring(2, 9) }],
    isCartOpen: true 
  })),
  
  // دالة المسح
  removeFromCart: (cartItemIdToRemove) => set((state) => ({
    cartItems: state.cartItems.filter(item => item.cartItemId !== cartItemIdToRemove)
  })),
  
  // دالة فتح وقفل السلة
  setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
}));