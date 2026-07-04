import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();

  const isAdmin = user?.role === "admin";

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/90 backdrop-blur-xl border-b border-border shadow-soft">

      <div className="max-w-content mx-auto px-6 lg:px-8">

        <div className="flex items-center justify-between h-24">

          {/* Logo */}

          <Link
            to="/"
            onClick={closeMenu}
            className="flex flex-col leading-none"
          >
            <span className="font-heading text-3xl lg:text-4xl tracking-[0.25em] text-primary">
              ✦ DREAMLAND
            </span>

            <span className="font-body text-[10px] lg:text-[11px] uppercase tracking-[0.35em] text-secondary mt-1">
              Soft Future Jewelry
            </span>
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden lg:flex items-center gap-8">

            <Link
              to="/"
              className="font-body text-secondary hover:text-primary transition-colors"
            >
              Etusivu
            </Link>

            <Link
              to="/cart"
              className="relative flex items-center gap-2 font-body text-secondary hover:text-primary transition-colors"
            >
              <ShoppingCart size={18} />

              <span>Ostoskori</span>

              {cart.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-accent text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
                  {cart.length}
                </span>
              )}
            </Link>

            {isAdmin && (
              <Link
                to="/secret-dashboard"
                className="bg-primary hover:bg-accent text-white rounded-2xl px-4 py-2 flex items-center gap-2 transition-all shadow-soft"
              >
                <Lock size={16} />
                Dashboard
              </Link>
            )}

            {user ? (
              <button
                onClick={logout}
                className="bg-primary hover:bg-accent text-white rounded-2xl px-4 py-2 flex items-center gap-2 transition-all shadow-soft"
              >
                <LogOut size={16} />
                Kirjaudu ulos
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-accent hover:bg-accent text-primary rounded-2xl px-4 py-2 flex items-center gap-2 transition-all shadow-soft"
                >
                  <UserPlus size={16} />
                  Rekisteröidy
                </Link>

                <Link
                  to="/login"
                  className="bg-primary hover:bg-accent text-white rounded-2xl px-4 py-2 flex items-center gap-2 transition-all shadow-soft"
                >
                  <LogIn size={16} />
                  Kirjaudu
                </Link>
              </>
            )}

          </nav>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-accent/20 transition-colors"
          >
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>

        </div>
      </div>
      {/* Mobile Menu */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-border bg-background shadow-floating"
          >
            <div className="flex flex-col px-6 py-8 gap-5">

              <Link
                to="/"
                onClick={closeMenu}
                className="text-lg font-body text-primary hover:text-accent transition-colors"
              >
                Etusivu
              </Link>

              <Link
                to="/cart"
                onClick={closeMenu}
                className="flex items-center justify-between text-lg font-body text-primary hover:text-accent transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart size={20} />
                  <span>Ostoskori</span>
                </div>

                {cart.length > 0 && (
                  <span className="bg-accent text-primary rounded-full w-7 h-7 flex items-center justify-center text-sm font-semibold">
                    {cart.length}
                  </span>
                )}
              </Link>

              {isAdmin && (
                <Link
                  to="/secret-dashboard"
                  onClick={closeMenu}
                  className="flex items-center gap-3 text-lg font-body text-primary hover:text-accent transition-colors"
                >
                  <Lock size={20} />
                  Dashboard
                </Link>
              )}

              <div className="border-t border-border pt-6 flex flex-col gap-4">

                {user ? (
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="bg-primary text-white rounded-2xl py-3 flex items-center justify-center gap-2 shadow-soft hover:bg-accent transition-all"
                  >
                    <LogOut size={18} />
                    Kirjaudu ulos
                  </button>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      onClick={closeMenu}
                      className="bg-accent text-primary rounded-2xl py-3 flex items-center justify-center gap-2 shadow-soft hover:opacity-90 transition-all"
                    >
                      <UserPlus size={18} />
                      Rekisteröidy
                    </Link>

                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="bg-primary text-white rounded-2xl py-3 flex items-center justify-center gap-2 shadow-soft hover:bg-accent transition-all"
                    >
                      <LogIn size={18} />
                      Kirjaudu
                    </Link>
                  </>
                )}

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
};

export default Navbar;