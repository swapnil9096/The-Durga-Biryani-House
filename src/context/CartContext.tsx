"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { CartExtras, CartItem, MenuItem, SpiceLevel } from "@/types";
import { getExtra } from "@/config/extras";
import { track } from "@/lib/analytics";

const STORAGE_KEY = "durga-cart-v3";

const lineKey = (id: string, spiceLevel: SpiceLevel) => `${id}__${spiceLevel}`;

interface CartState {
  items: CartItem[];
  extras: CartExtras;
}

type CartAction =
  | { type: "hydrate"; items: CartItem[]; extras: CartExtras }
  | { type: "add"; item: MenuItem; quantity: number; spiceLevel: SpiceLevel }
  | { type: "remove"; key: string }
  | { type: "increment"; key: string }
  | { type: "decrement"; key: string }
  | { type: "setQuantity"; key: string; quantity: number }
  | { type: "setExtra"; id: string; quantity: number }
  | { type: "clear" };

/**
 * Extras (raita, salad, …) are add-ons to a main order, never an order on
 * their own. Once the last main item leaves the cart, drop any lingering
 * extras so the cart reads as genuinely empty.
 */
function normalize(state: CartState): CartState {
  if (state.items.length === 0 && Object.keys(state.extras).length > 0) {
    return { ...state, extras: {} };
  }
  return state;
}

function reducer(state: CartState, action: CartAction): CartState {
  return normalize(baseReducer(state, action));
}

function baseReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return { items: action.items, extras: action.extras };

    case "add": {
      const key = lineKey(action.item.id, action.spiceLevel);
      const existing = state.items.find((i) => i.key === key);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.key === key
              ? { ...i, quantity: i.quantity + action.quantity }
              : i
          ),
        };
      }
      const newItem: CartItem = {
        key,
        id: action.item.id,
        name: action.item.name,
        price: action.item.price,
        image: action.item.image,
        vegetarian: action.item.vegetarian,
        spiceLevel: action.spiceLevel,
        quantity: action.quantity,
      };
      return { ...state, items: [...state.items, newItem] };
    }

    case "remove":
      return {
        ...state,
        items: state.items.filter((i) => i.key !== action.key),
      };

    case "increment":
      return {
        ...state,
        items: state.items.map((i) =>
          i.key === action.key ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };

    case "decrement":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.key === action.key ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0),
      };

    case "setQuantity":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.key === action.key
              ? { ...i, quantity: Math.max(0, action.quantity) }
              : i
          )
          .filter((i) => i.quantity > 0),
      };

    case "setExtra": {
      const quantity = Math.max(0, Math.floor(action.quantity));
      const next = { ...state.extras };
      if (quantity > 0) next[action.id] = quantity;
      else delete next[action.id];
      return { ...state, extras: next };
    }

    case "clear":
      return { items: [], extras: {} };

    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  extras: CartExtras;
  itemCount: number;
  subtotal: number;
  /** True until localStorage has been read (avoids hydration flash). */
  ready: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: MenuItem, spiceLevel: SpiceLevel, quantity?: number) => void;
  removeItem: (key: string) => void;
  increment: (key: string) => void;
  decrement: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  setExtra: (id: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], extras: {} });
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Hydrate from localStorage once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          items?: CartItem[];
          extras?: CartExtras;
        };
        const items = Array.isArray(parsed?.items) ? parsed.items : [];
        const extras =
          parsed?.extras && typeof parsed.extras === "object"
            ? parsed.extras
            : {};
        dispatch({ type: "hydrate", items, extras });
      }
    } catch {
      // Corrupt storage — start with an empty cart.
    }
    // One-time hydration flag; running only on mount is intended.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, []);

  // Persist on every change (after hydration).
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ items: state.items, extras: state.extras })
      );
    } catch {
      // Storage full or unavailable — ignore.
    }
  }, [state.items, state.extras, ready]);

  const value = useMemo<CartContextValue>(() => {
    const itemsCount = state.items.reduce((n, i) => n + i.quantity, 0);
    const extrasCount = Object.values(state.extras).reduce((n, q) => n + q, 0);
    const itemsSubtotal = state.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );
    const extrasSubtotal = Object.entries(state.extras).reduce(
      (sum, [id, qty]) => sum + (getExtra(id)?.price ?? 0) * qty,
      0
    );
    return {
      items: state.items,
      extras: state.extras,
      itemCount: itemsCount + extrasCount,
      subtotal: itemsSubtotal + extrasSubtotal,
      ready,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem: (item, spiceLevel, quantity = 1) => {
        dispatch({ type: "add", item, quantity, spiceLevel });
        track("add_to_cart", {
          item_id: item.id,
          item_name: item.name,
          spice_level: spiceLevel,
        });
      },
      removeItem: (key) => {
        dispatch({ type: "remove", key });
        track("remove_from_cart", { item_key: key });
      },
      increment: (key) => dispatch({ type: "increment", key }),
      decrement: (key) => dispatch({ type: "decrement", key }),
      setQuantity: (key, quantity) =>
        dispatch({ type: "setQuantity", key, quantity }),
      setExtra: (id, quantity) => dispatch({ type: "setExtra", id, quantity }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state.items, state.extras, ready, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
