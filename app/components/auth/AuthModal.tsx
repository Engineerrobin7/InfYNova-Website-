"use client";

import { useState } from 'react';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'signin' | 'signup';
}

export const AuthModal = ({ isOpen, onClose, defaultView = 'signin' }: AuthModalProps) => {
  const [view, setView] = useState<'signin' | 'signup'>(defaultView);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md"
        >
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 bg-card border border-border rounded-full p-2 hover:bg-accent/10 transition z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {view === 'signin' ? (
            <SignInForm
              onSuccess={onClose}
              onSwitchToSignUp={() => setView('signup')}
            />
          ) : (
            <SignUpForm
              onSuccess={onClose}
              onSwitchToSignIn={() => setView('signin')}
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
