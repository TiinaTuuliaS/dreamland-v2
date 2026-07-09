import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const CategoryItem = ({ category }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group"
    >
      <Link to={`/category${category.href}`} className="block">

        <div
          className="
            relative
            overflow-hidden
            rounded-[32px]
            shadow-soft
            hover:shadow-floating
            transition-all
            duration-300
          "
        >

          {/* Kuva */}

          <img
            src={category.imageUrl}
            alt={category.name}
            loading="lazy"
            className="
              w-full
              h-[320px]
              sm:h-[380px]
              lg:h-[420px]
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
            "
          />

          {/* Kevyt overlay */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-primary/55
              via-primary/10
              to-transparent
            "
          />

          {/* Sisältö */}

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              p-6
              flex
              justify-between
              items-end
            "
          >

            <h3
              className="
                font-heading
                text-3xl
                text-white
              "
            >
              {category.name}
            </h3>

            <ArrowRight
              size={24}
              className="
                text-white
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />

          </div>

        </div>

      </Link>
    </motion.div>
  );
};

export default CategoryItem;
