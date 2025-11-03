// ProductPreview.tsx
"use client";

import Image from "next/image";

interface ProductPreviewProps {
  name: string;
  initialPrice: string;
  discountPrice?: string;
  category: string;
  location: string;
  description: string;
  imagePreview: string;
  onEdit: () => void;
  onPost: () => Promise<void>;
}

export default function ProductPreview({
  name,
  initialPrice,
  discountPrice,
  category,
  location,
  description,
  imagePreview,
  onEdit,
  onPost,
}: ProductPreviewProps) {
  const initial = Number(initialPrice.replace(/,/g, ""));
  const discount = discountPrice
    ? Number(discountPrice.replace(/,/g, ""))
    : undefined;

  const percentageOff =
    discount && initial > 0
      ? Math.round(((initial - discount) / initial) * 100)
      : 0;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 relative">
      <h2 className="text-xl font-semibold text-gray-800">Preview Product</h2>

      <div className="relative w-full h-64">
        {discount && percentageOff > 0 && (
          <span className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-sm font-semibold z-10">
            {percentageOff}% OFF
          </span>
        )}
        <Image
          src={imagePreview}
          alt={name}
          fill
          className="object-contain rounded"
          sizes="100vw"
        />
      </div>

      <p className="font-semibold text-gray-800">{name}</p>
      <p className="text-gray-500">Category: {category}</p>
      <p className="text-gray-500">Location: {location}</p>
      <p className="line-clamp-3 text-gray-700 cursor-pointer">{description}</p>

      <p className="text-gray-900">
        {discount ? (
          <>
            <span className="text-red-600 font-semibold">
              ₦{discount.toLocaleString()}
            </span>{" "}
            <span className="line-through text-gray-500 ml-2">
              ₦{initial.toLocaleString()}
            </span>
          </>
        ) : (
          <>₦{initial.toLocaleString()}</>
        )}
      </p>

      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="flex-1 bg-gray-500 py-2 rounded hover:bg-gray-600 transition"
        >
          Edit
        </button>
        <button
          onClick={onPost}
          className="flex-1 bg-brand text-white py-2 rounded hover:bg-brand-dark transition"
        >
          Post
        </button>
      </div>
    </div>
  );
}
