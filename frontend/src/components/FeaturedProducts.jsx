import { useEffect, useState } from "react";
import {
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const { addToCart } = useCartStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (currentIndex >= featuredProducts.length - itemsPerPage) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex === 0) {
      setCurrentIndex(featuredProducts.length - itemsPerPage);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!featuredProducts || featuredProducts.length === 0) return null;

  return (
    <section className="pt-10 pb-20">

      <div className="text-center mb-12">

        <p className="uppercase tracking-[0.35em] text-secondary text-xs mb-4">
          Handpicked Favorites
        </p>

        <h2 className="font-heading text-4xl lg:text-5xl text-primary">
          ✦ Dreamland Picks
        </h2>

      </div>

      <div className="relative">

        <button
          onClick={prevSlide}
          className="
            absolute
            left-0
            top-1/2
            -translate-y-1/2
            z-20
            hidden
            md:flex
            w-12
            h-12
            rounded-full
            bg-surface
            border
            border-border
            shadow-soft
            items-center
            justify-center
            transition-all
            duration-300
            hover:bg-accent
            hover:text-white
          "
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={nextSlide}
          className="
            absolute
            right-0
            top-1/2
            -translate-y-1/2
            z-20
            hidden
            md:flex
            w-12
            h-12
            rounded-full
            bg-surface
            border
            border-border
            shadow-soft
            items-center
            justify-center
            transition-all
            duration-300
            hover:bg-accent
            hover:text-white
          "
        >
          <ChevronRight size={22} />
        </button>

        <div className="overflow-hidden">

          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / itemsPerPage)
              }%)`,
            }}
          >
            {featuredProducts.map((product) => (

              <div
                key={product._id}
                className="flex-shrink-0 px-3"
                style={{
                  flexBasis: `${100 / itemsPerPage}%`,
                }}
              >

                <div
                  className="
                    bg-surface
                    rounded-[28px]
                    border
                    border-border
                    shadow-soft
                    overflow-hidden
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:shadow-xl
                    h-full
                  "
                >

                  <div className="overflow-hidden bg-accent/5">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="
                        w-full
                        aspect-square
                        object-contain
                        p-8
                        transition-transform
                        duration-500
                        hover:scale-105
                      "
                    />

                  </div>

                  <div className="p-6">

                    <h3 className="font-heading text-2xl text-primary mb-2">
                      {product.name}
                    </h3>

                    <p className="text-secondary mb-6">
                      € {product.price.toFixed(2)}
                    </p>

                                        <button
                      onClick={() => addToCart(product)}
                      className="
                        w-full
                        rounded-2xl
                        bg-primary
                        text-white
                        py-3.5
                        font-body
                        flex
                        items-center
                        justify-center
                        gap-2
                        transition-all
                        duration-300
                        hover:bg-accent-hover
                        hover:shadow-lg
                        hover:-translate-y-0.5
                        active:translate-y-0
                      "
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>

                  </div>

                </div>

              </div>

            ))}
          </div>

        </div>

      </div>

    </section>
  );
};

export default FeaturedProducts;


