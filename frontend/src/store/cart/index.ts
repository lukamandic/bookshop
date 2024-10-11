import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

interface CartState {
  cart: CartItem[] | [];
  visible: boolean;
  count: () => number;
  totalPrice: () => number;
  add: (book: CartItem) => void;
  remove: (id: string) => void;
  update: (id: string, qty: number) => void;
}

const remove = (id: string, cart: CartItem[]): CartItem[] => {
  return cart.filter((item) => item.id !== id);
};

const add = (book: CartItem, cart: CartItem[]): CartItem[] => {
  const bookExists = cart.find((item) => item.id === book.id);
  if (bookExists) {
    return cart;
  }
  return [...cart, book];
};

const update = (id: string, qty: number, cart: CartItem[]): CartItem[] => {
  return cart.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        qty,
      };
    }
    return item;
  });
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      visible: false,
      count: () => {
        const { cart } = get();
        return cart.length;
      },
      totalPrice: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.price * item.qty, 0);
      },
      add: (book: CartItem) => {
        const { cart } = get();
        const updatedCart = add(book, cart);
        set({ cart: updatedCart });
      },
      remove: (id: string) => {
        const { cart } = get();
        const updatedCart = remove(id, cart);
        set({ cart: updatedCart });
      },
      update: (id: string, qty: number) => {
        const { cart } = get();
        const updatedCart = update(id, qty, cart);
        console.log(updatedCart);
        set({ cart: updatedCart });
      },
    }),
    {
      name: "cartStorage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
