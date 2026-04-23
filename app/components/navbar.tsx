"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X, ArrowRight, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "./auth/AuthModal";
import { UserMenu } from "./auth/UserMenu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'signin' | 'signup'>('signin');
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, loading } = useAuth();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Add scroll event listener to apply background opacity based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleJoinMovement = () => {
    // Scroll to pre-order form if on home page
    if (isHomePage) {
      const buySection = document.getElementById("buy");
      if (buySection) {
        buySection.scrollIntoView({ behavior: "smooth" });
      }
      // Close mobile menu if open
      setIsMenuOpen(false);
    } else {
      // If not on homepage, navigate to homepage and then scroll
      window.location.href = "/#buy";
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 shadow-sm border-b border-border/50' : 'bg-background/80 border-b border-transparent'
      } backdrop-blur-md`}
      aria-label="Main navigation"
    >
      <div className="container flex items-center justify-between py-3 md:py-4 px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 group" aria-label="Infynova home page">
            <Image
              src="/logo.svg"
              alt="InfYNova logo"
              width={140}
              height={36}
              priority
              className="h-7 md:h-8 w-auto transition-opacity group-hover:opacity-80"
            />
            <span className="sr-only">InfYNova</span>
          </Link>
        </div>

        {/* Desktop Navigation - Minimal */}
        <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
          <Link href="/" className={`text-sm font-medium transition-colors ${pathname === '/' ? 'text-white' : 'text-white/70 hover:text-white'}`}>
            Home
          </Link>
          <Link href="/about" className={`text-sm font-medium transition-colors ${pathname === '/about' ? 'text-white' : 'text-white/70 hover:text-white'}`}>
            About
          </Link>
          <Link href="/novaos" className={`text-sm font-medium transition-colors ${pathname === '/novaos' ? 'text-white' : 'text-white/70 hover:text-white'}`}>
            NovaOS
          </Link>
          <Link href="/press" className={`text-sm font-medium transition-colors ${pathname === '/press' ? 'text-white' : 'text-white/70 hover:text-white'}`}>
            Press
          </Link>
        </nav>

        {/* Right side - CTA and mobile menu */}
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          {/* Primary CTA - Hidden on mobile to save space */}
          <div className="hidden lg:block">
            <Button 
              onClick={handleJoinMovement} 
              className="bg-white text-black hover:bg-white/90 font-semibold rounded-full px-6 py-2.5 h-auto transition-all group"
              aria-label="Join waitlist"
            >
              <span className="text-sm">Join Waitlist</span>
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation - Clean and minimal */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden py-4 px-4 bg-background border-t border-border/50"
          >
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className={`text-sm font-medium py-2 transition-colors ${pathname === '/' ? 'text-white' : 'text-white/70 hover:text-white'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`text-sm font-medium py-2 transition-colors ${pathname === '/about' ? 'text-white' : 'text-white/70 hover:text-white'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/novaos"
                className={`text-sm font-medium py-2 transition-colors ${pathname === '/novaos' ? 'text-white' : 'text-white/70 hover:text-white'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                NovaOS
              </Link>
              <Link
                href="/press"
                className={`text-sm font-medium py-2 transition-colors ${pathname === '/press' ? 'text-white' : 'text-white/70 hover:text-white'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Press
              </Link>
              
              {/* Mobile CTA */}
              <Button 
                onClick={() => {
                  handleJoinMovement();
                  setIsMenuOpen(false);
                }} 
                className="w-full mt-4 bg-white text-black hover:bg-white/90 font-semibold rounded-full py-3 group"
              >
                <span>Join Waitlist</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultView={authView}
      />
    </header>
  );
}