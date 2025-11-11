"use client";

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
        isScrolled ? 'bg-background/95 shadow-md' : 'bg-background/80'
      } backdrop-blur-md border-b border-border/50`}
      aria-label="Main navigation"
    >
      <div className="container flex items-center justify-between py-3 md:py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center" aria-label="Infynova home page">
            <h1 className="text-xl md:text-2xl font-light tracking-tighter">
              <span className="font-bold">INFY</span>NOVA
              <span className="text-xs text-primary/80 ml-2 hidden sm:inline-block">Awaken the Future</span>
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link href="/" className={`text-foreground/80 hover:text-primary transition-colors ${pathname === '/' ? 'text-primary' : ''}`}>Home</Link>
          <Link href="/about" className={`text-foreground/80 hover:text-primary transition-colors ${pathname === '/about' ? 'text-primary' : ''}`}>About Us</Link>
          <Link href="/novaos" className={`text-foreground/80 hover:text-primary transition-colors ${pathname === '/novaos' ? 'text-primary' : ''}`}>NovaOS</Link>
          <Link href="/contact" className={`text-foreground/80 hover:text-primary transition-colors ${pathname === '/contact' ? 'text-primary' : ''}`}>Contact Us</Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          
          {!loading && (
            <>
              {user ? (
                <UserMenu />
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setAuthView('signin');
                      setIsAuthModalOpen(true);
                    }}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      setAuthView('signup');
                      setIsAuthModalOpen(true);
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </>
          )}
          
          <div className="hidden md:block">
            <Button onClick={handleJoinMovement} className="group" aria-label="Join the Movement">
              Join the Movement
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
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
      
      {/* Mobile Navigation - Improved with animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden py-4 px-6 bg-background border-t border-border"
          >
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`text-foreground/80 hover:text-primary transition-colors py-2 ${pathname === '/' ? 'text-primary' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`text-foreground/80 hover:text-primary transition-colors py-2 ${pathname === '/about' ? 'text-primary' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/novaos"
                className={`text-foreground/80 hover:text-primary transition-colors py-2 ${pathname === '/novaos' ? 'text-primary' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                NovaOS
              </Link>
              <Link
                href="/contact"
                className={`text-foreground/80 hover:text-primary transition-colors py-2 ${pathname === '/contact' ? 'text-primary' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              {!loading && !user && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setAuthView('signin');
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      setAuthView('signup');
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Sign Up
                  </Button>
                </>
              )}
              <Button onClick={handleJoinMovement} className="w-full mt-2 group">
                Join the Movement 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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