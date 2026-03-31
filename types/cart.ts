// types/cart.ts
export interface CartItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
  image?: string;
  description?: string;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number | string) => void;
  updateQuantity: (id: number | string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}