"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import ProductPreview from "./ProductPreview";

const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Beauty",
  "Home",
  "Sports",
  "Books",
];
const MAX_NAME_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 200;

export default function PostProductForm() {
  const [name, setName] = useState("");
  const [initialPrice, setInitialPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Format prices with commas as user types
  const handleInitialPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    if (!isNaN(Number(rawValue))) {
      setInitialPrice(Number(rawValue).toLocaleString());
    }
  };

  const handleDiscountPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    if (!isNaN(Number(rawValue))) {
      setDiscountPrice(Number(rawValue).toLocaleString());
    }
  };

  const handlePost = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("initialPrice", initialPrice);
    if (discountPrice) formData.append("discountPrice", discountPrice);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to post product");

      alert("Product posted successfully!");
      // Reset form
      setName("");
      setInitialPrice("");
      setDiscountPrice("");
      setCategory(CATEGORIES[0]);
      setLocation("");
      setDescription("");
      setImage(null);
      setImagePreview(null);
      setIsPreview(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  if (isPreview && imagePreview) {
    return (
      <ProductPreview
        name={name}
        initialPrice={initialPrice}
        discountPrice={discountPrice}
        category={category}
        location={location}
        description={description}
        imagePreview={imagePreview}
        onEdit={() => setIsPreview(false)}
        onPost={handlePost}
      />
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 text-black">
      <h2 className="text-xl font-semibold">Post a Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value.slice(0, MAX_NAME_LENGTH))}
        className="w-full border rounded px-3 py-2"
        maxLength={MAX_NAME_LENGTH}
        required
      />
      <p className="text-sm text-gray-500">
        {name.length}/{MAX_NAME_LENGTH}
      </p>

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value.slice(0, MAX_DESCRIPTION_LENGTH))
        }
        className="w-full border rounded px-3 py-2"
        rows={4}
        required
      />
      <p className="text-sm text-gray-500">
        {description.length}/{MAX_DESCRIPTION_LENGTH}
      </p>

      <input
        type="text"
        placeholder="Initial Price (₦)"
        value={initialPrice}
        onChange={handleInitialPriceChange}
        className="w-full border rounded px-3 py-2"
        required
      />

      <input
        type="text"
        placeholder="Discounted Price (optional)"
        value={discountPrice}
        onChange={handleDiscountPriceChange}
        className="w-full border rounded px-3 py-2"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border rounded px-3 py-2 bg-white"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full border rounded px-3 py-2"
        required
      />

      {imagePreview && (
        <div className="relative w-full h-64 mt-2">
          <Image
            src={imagePreview}
            alt="Preview"
            fill
            className="object-contain rounded"
            sizes="100vw"
          />
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsPreview(true)}
        className="w-full bg-brand text-white py-2 rounded hover:bg-brand-dark transition"
      >
        Preview Product
      </button>
    </div>
  );
}
