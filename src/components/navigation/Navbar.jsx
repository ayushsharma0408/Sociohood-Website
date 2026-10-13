import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navLinks } from "../../data/modules.js";
import { useBookDemo } from "../../context/BookDemoContext.jsx";
import Logo from "../common/Logo.jsx";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { openBookDemo } = useBookDemo();

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const closeMenu = () => setOpen(false);

  const handleBookDemo = () => {
    closeMenu();
    openBookDemo();
  };

  const linkTo = (href) => {
    if (href.startsWith("/")) return href;
    if (location.pathname === "/") return href;
    return `/${href}`;
  };

  const isActive = (href) => {
    if (href.startsWith("/case-studies")) {
      return location.pathname.startsWith("/case-studies");
    }
    if (href.startsWith("/blog")) {
      return location.pathname.startsWith("/blog");
    }
    if (href.startsWith("/company")) {
      return location.pathname.startsWith("/company");
    }
    if (href.startsWith("/products/")) {
      return location.pathname.startsWith(href);
    }
    return false;
  };

  return (
    <header>
      <Logo onClick={closeMenu} />
      <nav className={open ? "shown" : ""}>
        {navLinks.map((link) => {
          const to = link.href.startsWith("/") ? link.href : linkTo(link.href);
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              to={to}
              onClick={closeMenu}
              className={active ? "is-active" : undefined}
              aria-current={active ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <button type="button" className="nav-cta" onClick={handleBookDemo}>
        Book a demo
      </button>
      <button
        type="button"
        className="mobile-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
    </header>
  );
};

export default Navbar;
