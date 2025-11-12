"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflow: 'auto',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '448px',
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
            border: '2px solid #e5e7eb',
            borderRadius: '9999px',
            padding: '8px',
            cursor: 'pointer',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          }}
          className="hover:bg-red-500 hover:text-white transition-all"
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
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
