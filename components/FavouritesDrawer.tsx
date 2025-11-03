"use client";

import { useShop } from "@/context/ShopContext";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FavoritesDrawer({
  isOpen,
  onClose,
}: FavoritesDrawerProps) {
  const { favorites } = useShop();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-40"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            className="relative ml-auto bg-white w-80 h-full shadow-lg p-5 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-brand">
                ❤️ Your Favourites
              </h2>
              <button onClick={onClose}>
                <FiX className="text-2xl text-brand-dark hover:text-brand transition" />
              </button>
            </div>

            {favorites.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">
                Your favourites is empty 😢
              </p>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-4">
                {favorites.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b border-gray-200 pb-3"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-brand-dark font-semibold">
                          {item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {favorites.length > 0 && (
              <button
                onClick={() => alert("Proceeding to checkout...")}
                className="mt-5 bg-brand] text-white py-2 rounded-lg font-semibold hover:bg-brand-dark transition"
              >
                Checkout
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
