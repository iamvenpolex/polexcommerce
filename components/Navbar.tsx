"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiShoppingCart,
  FiUser,
  FiHeart,
  FiMenu,
  FiX,
  FiSearch,
  FiLogOut,
} from "react-icons/fi";
import { useShop } from "@/context/ShopContext";
import CartDrawer from "@/components/CartDrawer";
import FavouritesDrawer from "@/components/FavouritesDrawer";
import { useSessionStorage } from "@/hooks/useSessionStorage";

// ✅ Define the user type
type User = {
  id: string;
  name: string;
  email: string;
};

function Badge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="absolute -top-2 -right-2 bg-brand text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
      {count}
    </span>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavouritesOpen, setIsFavouritesOpen] = useState(false);

  // ✅ Tell TypeScript that user can be User or null
  const [user, setUser] = useSessionStorage<User | null>("user", null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { cart, favorites } = useShop();

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  const handleLogout = () => {
    setUser(null); // clear session
    setShowDropdown(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-brand">
          Mipi
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 justify-center mx-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search for products, brands and categories"
              className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <FiSearch className="absolute right-3 top-2.5 text-gray-500" />
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4 text-gray-700 relative">
          {/* Favorites */}
          <button
            onClick={() => setIsFavouritesOpen(true)}
            className="relative hover:text-brand"
          >
            <FiHeart size={20} />
            {mounted && <Badge count={favorites.length} />}
          </button>

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative hover:text-brand"
          >
            <FiShoppingCart size={20} />
            {mounted && <Badge count={cart.length} />}
          </button>

          {/* User Icon */}
          <div className="relative">
            {user ? (
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="hover:text-brand flex items-center space-x-1"
              >
                <FiUser size={20} />
                <span className="text-sm font-medium">{user.name}</span>
              </button>
            ) : (
              <Link href="/login" className="hover:text-brand">
                <FiUser size={20} />
              </Link>
            )}

            {/* Dropdown for logged-in user */}
            {showDropdown && user && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md text-sm">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                  onClick={() => setShowDropdown(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/orders"
                  className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                  onClick={() => setShowDropdown(false)}
                >
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700 hover:text-brand"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-3">
          <Link href="/" className="block text-gray-800 hover:text-brand">
            Home
          </Link>
          <Link href="/shop" className="block text-gray-800 hover:text-brand">
            Shop
          </Link>
          <Link
            href="/categories"
            className="block text-gray-800 hover:text-brand"
          >
            Categories
          </Link>
          <Link
            href="/contact"
            className="block text-gray-800 hover:text-brand"
          >
            Contact
          </Link>
        </nav>
      )}

      {/* Drawers */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <FavouritesDrawer
        isOpen={isFavouritesOpen}
        onClose={() => setIsFavouritesOpen(false)}
      />
    </header>
  );
}
