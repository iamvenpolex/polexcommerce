"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number | string;
  name: string;
  price: string;
  image: string;
  category: string;
}

// Sample products with categories
const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "₦12,000",
    image: "/woman.png",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "₦18,500",
    image: "/woman.png",
    category: "Wearables",
  },
  {
    id: 3,
    name: "Running Sneakers",
    price: "₦22,000",
    image: "/woman.png",
    category: "Shoes",
  },
  {
    id: 4,
    name: "Gaming Controller",
    price: "₦15,000",
    image: "/woman.png",
    category: "Electronics",
  },
  {
    id: 5,
    name: "Phone Tripod Stand",
    price: "₦7,000",
    image: "/woman.png",
    category: "Accessories",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: "₦11,500",
    image: "/woman.png",
    category: "Electronics",
  },
];

// Unique categories for filter buttons
const categories = [
  "All",
  ...Array.from(new Set(products.map((p) => p.category))),
];

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-10 md:py-14 px-5 md:px-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
          Categories
        </h2>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                selectedCategory === category
                  ? "bg-brand text-white"
                  : "bg-white text-gray-800 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              imageProps={{
                sizes:
                  "(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw",
                loading: "eager",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
