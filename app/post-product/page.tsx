"use client";

import { useSessionStorage } from "@/hooks/useSessionStorage";
import PostProductForm from "@/components/PostProductForm";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";

export default function PostProductPage() {
  const [user] = useSessionStorage<{ name: string } | null>("user", null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isMounted) return null; // Prevent SSR hydration mismatch

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Navbar />
        <h1 className="text-xl font-semibold mb-4 text-gray-900">
          You must be logged in to post a product
        </h1>
        <a
          href="/login"
          className="bg-brand text-white px-4 py-2 rounded hover:bg-brand-dark transition"
        >
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-10 bg-gray-50">
        <h1 className="text-2xl font-bold text-center mb-6 text-brand">
          Post a New Product
        </h1>
        <PostProductForm />
      </div>
    </>
  );
}
