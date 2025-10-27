"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Product {
  id: number | string; // ✅ handle both string & number IDs
  name: string;
  price: string;
  image: string;
}

interface ShopContextProps {
  cart: Product[];
  favorites: Product[];
  addToCart: (product: Product) => void;
  toggleFavorite: (product: Product) => void;
  isInCart: (id: number | string) => boolean;
  isFavorite: (id: number | string) => boolean;
}

const ShopContext = createContext<ShopContextProps | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  // ✅ Lazy initialization — reads from sessionStorage once on first render
  const [cart, setCart] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem("mipi_cart");
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [favorites, setFavorites] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem("mipi_favorites");
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  // ✅ Keep sessionStorage synced
  useEffect(() => {
    sessionStorage.setItem("mipi_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    sessionStorage.setItem("mipi_favorites", JSON.stringify(favorites));
  }, [favorites]);

  // ✅ Add / Remove from cart
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.some((item) => item.id == product.id);
      return exists
        ? prev.filter((item) => item.id != product.id)
        : [...prev, product];
    });
  };

  // ✅ Toggle favorites (Love / Unlove)
  const toggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id == product.id);
      console.log(
        exists ? "💔 Removing from favorites" : "❤️ Adding to favorites",
        product
      );
      return exists
        ? prev.filter((item) => item.id != product.id)
        : [...prev, product];
    });
  };

  // ✅ Checkers
  const isInCart = (id: number | string) => cart.some((item) => item.id == id);
  const isFavorite = (id: number | string) =>
    favorites.some((item) => item.id == id);

  return (
    <ShopContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        toggleFavorite,
        isInCart,
        isFavorite,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
