"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useIsClient } from "@/hooks/useIsClient";

export default function HomePage() {
  const [user] = useSessionStorage<{ name: string } | null>("user", null);
  const isClient = useIsClient();

  if (!isClient) return null; // Prevent SSR hydration mismatch

  return (
    <>
      <Navbar />
      {!user && <HeroSection />}
      <FeaturedProducts />
      <Categories />
      <Footer />
    </>
  );
}
