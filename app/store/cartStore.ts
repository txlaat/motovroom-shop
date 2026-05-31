import { create } from 'zustand';
interface CartState {
  cartItems: any[];
  isCartOpen: boolean;
  addToCart: (bike: any) => void;
  removeFromCart: (cartItemId: string) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  clearCart: () => void;
}
export const useCartStore = create<CartState>((set) => ({
  cartItems: [], 
  isCartOpen: false, 
  addToCart: (bike) => set((state) => ({
    cartItems: [...state.cartItems, { ...bike, cartItemId: Math.random().toString(36).substring(2, 9) }],
    isCartOpen: true 
  })),
  removeFromCart: (cartItemIdToRemove) => set((state) => ({
    cartItems: state.cartItems.filter(item => item.cartItemId !== cartItemIdToRemove)
  })),
  setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
  clearCart: () => set({ cartItems: [] }),
}));
