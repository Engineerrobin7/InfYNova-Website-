"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'signin' | 'signup';
}

export const AuthModal = ({ isOpen, onClose, defaultView = 'signin' }: AuthModalProps) => {
  const [view, setView] = useState<'signin' | 'signup'>(defaultView);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="auth-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(12px)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            overflow: 'auto',
          }}
          aria-modal="true"
          role="dialog"
          aria-labelledby="auth-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '480px',
              margin: 'auto',
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '-12px',
                right: '-12px',
                zIndex: 1000000,
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '9999px',
                padding: '8px',
                cursor: 'pointer',
                boxShadow: '0 16px 32px rgba(0, 0, 0, 0.12)',
              }}
              className="hover:bg-slate-100 transition-all"
              aria-label="Close authentication dialog"
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
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};
