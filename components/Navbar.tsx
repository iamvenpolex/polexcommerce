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
} from "react-icons/fi";
import { useShop } from "@/context/ShopContext";

// Small reusable Badge component
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
  const { cart, favorites } = useShop();
  const [mounted, setMounted] = useState(false);

  // ✅ Hydration-safe mount
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

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
              className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <FiSearch className="absolute right-3 top-2.5 text-gray-500" />
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4 text-gray-700 relative">
          {/* Favorites */}
          <Link href="/favorites" className="relative hover:text-brand">
            <FiHeart size={20} />
            {mounted && <Badge count={favorites.length} />}
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative hover:text-brand">
            <FiShoppingCart size={20} />
            {mounted && <Badge count={cart.length} />}
          </Link>

          {/* User */}
          <button className="hover:text-brand">
            <FiUser size={20} />
          </button>

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
    </header>
  );
}
