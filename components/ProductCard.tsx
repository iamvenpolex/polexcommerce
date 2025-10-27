"use client";

import Image, { ImageProps } from "next/image";
import { FiHeart, FiShoppingCart, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";
import { useShop } from "@/context/ShopContext";

interface Product {
  id: number | string;
  name: string;
  price: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  index?: number;
  imageProps?: Partial<ImageProps>;
}

export default function ProductCard({
  product,
  index = 0,
  imageProps,
}: ProductCardProps) {
  const { addToCart, toggleFavorite, isInCart, isFavorite } = useShop();

  const inCart = isInCart(product.id);
  const isFav = isFavorite(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-gray-50 hover:bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square p-2 sm:p-3">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain"
          {...imageProps}
        />
      </div>

      {/* Product Details */}
      <div className="p-2 sm:p-3 text-center flex flex-col items-center gap-1 sm:gap-2">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="text-brand font-bold text-sm sm:text-base">
          {product.price}
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-2">
          <button
            onClick={() => addToCart(product)}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-2 sm:px-3 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer ${
              inCart
                ? "bg-gray-200 text-gray-700 cursor-default"
                : "bg-brand text-white hover:bg-brand-dark"
            }`}
          >
            {inCart ? <FiCheck size={12} /> : <FiShoppingCart size={12} />}
            {inCart ? "Added" : "Add"}
          </button>

          <button
            onClick={() => toggleFavorite(product)}
            className={`p-1.5 sm:p-2 rounded-full shadow transition cursor-pointer ${
              isFav ? "bg-brand text-white" : "bg-gray-200 text-gray-600"
            }`}
            title={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <FiHeart
              size={14}
              className={isFav ? "fill-white" : "fill-transparent"}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
