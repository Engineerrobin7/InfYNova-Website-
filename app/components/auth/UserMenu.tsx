"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { logOut, resendVerificationEmail } from '@/lib/firebase/auth';
import { toast } from 'sonner';
import { User, LogOut, Mail, Settings, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const UserMenu = () => {
  const { user, userData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Signed out successfully');
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign out');
    }
  };

  const handleResendVerification = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      await resendVerificationEmail(user);
      toast.success('Verification email sent! Check your inbox.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send verification email');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent/10 transition"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-semibold">
          {userData?.displayName?.charAt(0).toUpperCase() || 'U'}
        </div>
        <span className="hidden md:block font-medium">{userData?.displayName || 'User'}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-72 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                    {userData?.displayName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{userData?.displayName}</p>
                    <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>

                {!user.emailVerified && (
                  <div className="mt-3 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-yellow-600 dark:text-yellow-400">
                          Email not verified
                        </p>
                        <button
                          onClick={handleResendVerification}
                          disabled={loading}
                          className="text-xs text-yellow-600 dark:text-yellow-400 underline hover:no-underline mt-1 disabled:opacity-50"
                        >
                          {loading ? 'Sending...' : 'Resend verification'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-2">
                <button
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/10 transition text-left"
                  onClick={() => {
                    setIsOpen(false);
                    window.location.href = '/dashboard';
                  }}
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm">Dashboard</span>
                </button>

                <button
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/10 transition text-left"
                  onClick={() => {
                    setIsOpen(false);
                    // Navigate to settings page
                  }}
                >
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">Settings</span>
                </button>
              </div>

              <div className="p-2 border-t border-border">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-500 transition text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
