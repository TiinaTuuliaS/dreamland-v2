import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="
        relative
        w-[96%]
        max-w-[1600px]
        mx-auto
        overflow-hidden
        rounded-[48px]
        shadow-soft
      "
    >
      {/* Taustakuva */}
      <motion.img
        src="/images/hero/dreamland-hero.png"
        alt="Dreamland Hero"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          object-[83%]
          lg:object-[75%]
        "
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/35 to-transparent" />

      {/* Sisältö */}
      <div
        className="
          relative
          z-10
          flex
          items-end
          lg:items-center
          min-h-[70vh]
          lg:min-h-[90vh]
        "
      >
        <div
          className="
            w-full
            max-w-xl
            px-8
            py-12
            lg:px-20
            lg:py-0
          "
        >
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="
              font-body
              uppercase
              tracking-[0.35em]
              text-secondary
              text-xs
              sm:text-sm
              mb-4
            "
          >
            Soft Future Jewelry
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="
              font-heading
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-8xl
              leading-none
              text-primary
            "
          >
            ✦ DREAMLAND
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="
              mt-6
              text-base
              sm:text-lg
              lg:text-xl
              leading-relaxed
              text-secondary
              max-w-md
            "
          >
            Korosta omaa tyyliäsi.
            <br />
            Ajattomia koruja, joissa pehmeä futurismi kohtaa modernin
            eleganssin.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="
              mt-8
              bg-primary
              hover:bg-accent
              text-white
              px-8
              py-4
              rounded-3xl
              shadow-soft
              transition-all
              duration-300
              hover:-translate-y-1
            "
          >
            Tutustu mallistoon
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;