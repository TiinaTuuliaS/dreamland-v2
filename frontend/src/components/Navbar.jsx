import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();

  return (
    <header className="fixed top-0 left-0 w-full bg-background/90 backdrop-blur-xl border-b border-border shadow-soft z-50 transition-all duration-300">
      <div className="max-w-content mx-auto px-6 lg:px-8 py-5">
        <div className="flex justify-between items-center">
          <Link
  to="/"
  className="flex flex-col leading-none"
>
  <span className="font-heading text-2xl tracking-[0.25em] text-primary">
    ✦ DREAMLAND
  </span>

  <span className="font-body text-[11px] uppercase tracking-[0.35em] text-secondary mt-1">
    Soft Future Jewelry
  </span>
</Link>

          <nav className="flex items-center gap-4">
          <Link
  to="/"
  className="font-body text-secondary hover:text-primary transition-all duration-300 whitespace-nowrap px-3 py-2 rounded-full"
>
  Etusivu
</Link>

         <Link
  to="/cart"
  className="relative group flex items-center gap-2 font-body text-secondary hover:text-primary transition-all duration-300 whitespace-nowrap px-3 py-2 rounded-full"
>
  <ShoppingCart
  className="transition-all duration-300 group-hover:text-primary group-hover:scale-105"
  size={18}
/>

  <span>Ostoskori</span>

  {cart.length > 0 && (
    <span className="absolute -top-1 -right-1 bg-accent text-primary rounded-full  w-5 h-5 flex items-center justify-center text-xs font-semibold shadow-soft">
      {cart.length}
    </span>
  )}
</Link>
{isAdmin && (
  <Link
    to="/secret-dashboard"
    className="bg-primary hover:bg-accentHover text-white font-body px-4 py-2 rounded-2xl flex items-center gap-2 transition-all duration-300 whitespace-nowrap shadow-soft"
  >
    <Lock size={16} />
    Dashboard
  </Link>
)}
            

            {user ? (
              <button
                onClick={logout}
                className="bg-primary hover:bg-accentHover text-white font-body px-4 py-2 rounded-2xl flex items-center gap-2 transition-all duration-300 whitespace-nowrap shadow-soft"
              >
                <LogOut size={16} />
                Kirjaudu ulos
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-accent hover:bg-accentHover text-primary font-body px-4 py-2 rounded-2xl flex items-center gap-2 transition-all duration-300 whitespace-nowrap shadow-soft"
                >
                  <UserPlus size={16} />
                  Rekisteröidy
                </Link>
                <Link
                  to="/login"
                  className="bg-primary hover:bg-accentHover text-white font-body px-4 py-2 rounded-2xl flex items-center gap-2 transition-all duration-300 whitespace-nowrap shadow-soft"
                >
                  <LogIn size={16} />
                  Kirjaudu
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;


