import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";
export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
      <Categories />
    </>
  );
}
