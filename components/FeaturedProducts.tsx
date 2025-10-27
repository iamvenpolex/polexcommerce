"use client";

import ProductCard from "./ProductCard";

const products = [
  { id: 1, name: "Wireless Headphones", price: "₦12,000", image: "/woman.png" },
  { id: 2, name: "Smart Watch", price: "₦18,500", image: "/woman.png" },
  { id: 3, name: "Running Sneakers", price: "₦22,000", image: "/woman.png" },
  { id: 4, name: "Gaming Controller", price: "₦15,000", image: "/woman.png" },
  { id: 5, name: "Phone Tripod Stand", price: "₦7,000", image: "/woman.png" },
];

export default function FeaturedProducts() {
  return (
    <section className="py-10 md:py-14 px-5 md:px-12 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
          Featured Products
        </h2>

        {/* Horizontal scroll on mobile */}
        <div className="overflow-x-auto scrollbar-hide -mx-5 md:overflow-x-visible md:mx-0">
          <div className="flex gap-4 sm:gap-5 md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:gap-6 px-5 md:px-0">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="min-w-[48%] sm:min-w-[45%] md:min-w-0 flex-shrink-0 md:flex-shrink"
              >
                <ProductCard
                  product={product}
                  index={index}
                  imageProps={{
                    sizes:
                      "(max-width: 640px) 45vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw",
                    loading: "eager",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
