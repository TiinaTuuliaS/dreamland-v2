import React, { useEffect } from "react";
import { motion } from "framer-motion";
import CategoryItem from "../components/CategoryItem";
import FeaturedProducts from "../components/FeaturedProducts";
import { useProductStore } from "../stores/useProductStore";
import Hero from "../components/Hero";

const categories = [
  { href: "/korvakorut", name: "Korvakorut", imageUrl: "/korvakoru1.jpg" },
  { href: "/sormukset", name: "Sormukset", imageUrl: "/sormus1.jpg" },
  { href: "/aurinkolasit", name: "Aurinkolasit", imageUrl: "/lasit.jpeg" },
  { href: "/korusetit", name: "Korusetit", imageUrl: "/setti1.jpeg" },
  { href: "/rannekorut", name: "Rannekorut", imageUrl: "/rannekoru1.jpg" },
  { href: "/kaulakorut", name: "Kaulakorut", imageUrl: "/kaulakoru1.jpg" },
];


const HomePage = () => {
  const { fetchFeaturedProducts, featuredProducts, loading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  return (
<div className="relative min-h-screen bg-background text-primary overflow-hidden">

  {/* Blurit */}
  <div className="absolute top-20 left-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />

  <div className="absolute bottom-10 right-20 w-80 h-80 bg-ice/40 rounded-full blur-[120px]" />

  {/* Hero */}
  <Hero />

  {/* Muu sisältö */}
  <div className="relative z-10 max-w-content mx-auto px-6 lg:px-8 pt-12 lg:pt-8 pb-24">

    {/* Kategoriat */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {categories.map((category, index) => (
        <CategoryItem
          category={category}
          key={category.name}
          index={index}
        />
      ))}
    </div>

    {/* Featured Products */}
    {featuredProducts?.length > 0 && (
      <FeaturedProducts featuredProducts={featuredProducts} />
    )}

    {loading && (
      <p className="text-center text-lg text-gray-500">
        Ladataan tuotteita...
      </p>
    )}

    {!loading && featuredProducts?.length === 0 && (
      <p className="text-center text-lg text-gray-500">
        Ei suosikkituotteita tällä hetkellä.
      </p>
    )}

  </div>

</div>
  );
};

export default HomePage;

