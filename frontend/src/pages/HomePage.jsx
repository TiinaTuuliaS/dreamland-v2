import React, { useEffect } from "react";
import { motion } from "framer-motion";
import CategoryItem from "../components/CategoryItem";
import FeaturedProducts from "../components/FeaturedProducts";
import { useProductStore } from "../stores/useProductStore";
import Hero from "../components/Hero";

const categories = [
  {
    href: "/korvakorut",
    name: "korvakorut",
    imageUrl: "/images/category/korvakorutv4.png",
  },
    {
    href: "/aurinkolasit",
    name: "aurinkolasit",
    imageUrl: "/images/category/aurinkolasitv2.png",
  },
  {
    href: "/sormukset",
    name: "sormukset",
    imageUrl: "/images/category/sormuksetv3.png",
  },

  {
    href: "/korusetit",
    name: "korusetit",
    imageUrl: "/images/category/korusetitv2.png",
  },
  {
    href: "/kaulakorut",
    name: "kaulakorut",
    imageUrl: "/images/category/kaulakorutv2.png",
  },
  {
    href: "/rannekorut",
    name: "rannekorut",
    imageUrl: "/images/category/rannekorutv3.png",
  },
  
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
 <div className="relative z-10 w-[96%] max-w-[1600px] mx-auto pt-12 lg:pt-8 pb-24">

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

