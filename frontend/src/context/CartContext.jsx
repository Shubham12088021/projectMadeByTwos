import { createContext, useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import {BASE_URL} from "./src/config";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  /* =========================
     STATE
  ========================= */
  const [cartCount, setCartCount] = useState(
    () => Number(sessionStorage.getItem("cartCount")) || 0
  );

  const [animateBadge, setAnimateBadge] = useState(false);
  const prevCountRef = useRef(cartCount);
  const token = localStorage.getItem("token");

  /* =========================
     🔼 INCREASE CART COUNT
     (Optimistic UI)
  ========================= */
  const increaseCart = (qty = 1) => {
    setCartCount(prev => {
      const updated = prev + qty;
      sessionStorage.setItem("cartCount", updated);
      return updated;
    });
  };

  /* =========================
     🔽 DECREASE CART COUNT
  ========================= */
  const decreaseCart = (qty = 1) => {
    setCartCount(prev => {
      const updated = Math.max(prev - qty, 0);
      sessionStorage.setItem("cartCount", updated);
      return updated;
    });
  };

  /* =========================
     🔄 SYNC CART FROM BACKEND
     (TOTAL QTY)
  ========================= */
  const syncCart = async () => {
    if (!token) {
      setCartCount(0);
      sessionStorage.removeItem("cartCount");
      return;
    }

    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/cart`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const totalQty = data.items.reduce(
        (sum, item) => sum + item.qty,
        0
      );

      setCartCount(totalQty);
      sessionStorage.setItem("cartCount", totalQty);
    } catch (err) {
      console.error("Cart sync failed");
    }
  };

  /* =========================
     BADGE ANIMATION
  ========================= */
  useEffect(() => {
    if (cartCount !== prevCountRef.current) {
      setAnimateBadge(true);
      prevCountRef.current = cartCount;

      const timer = setTimeout(() => {
        setAnimateBadge(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  /* =========================
     AUTO SYNC
  ========================= */
  useEffect(() => {
    syncCart();
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount,
        increaseCart,   // ✅ NEW
        decreaseCart,   // ✅ NEW
        syncCart,
        animateBadge,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
