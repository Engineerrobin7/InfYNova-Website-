"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/Footer';
import { User, Mail, Phone, Calendar, Shield, CheckCircle, XCircle } from 'lucide-react';
import { resendVerificationEmail } from '@/lib/firebase/auth';
import { toast } from 'sonner';

export default function DashboardPage() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const [resendLoading, setResendLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      router.push('/');
    }
  }, [user, loading, router, mounted]);

  const handleResendVerification = async () => {
    if (!user) return;
    
    setResendLoading(true);
    try {
      await resendVerificationEmail(user);
      toast.success('Verification email sent! Check your inbox.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send verification email');
    } finally {
      setResendLoading(false);
    }
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !userData) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Welcome Back!
              </h1>
              <p className="text-muted-foreground">Manage your InfYNova account</p>
            </div>

            {/* Email Verification Alert */}
            {!user.emailVerified && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">
                      Email Verification Required
                    </h3>
                    <p className="text-sm text-yellow-600/80 dark:text-yellow-400/80 mb-3">
                      Please verify your email address to access all features. Check your inbox for the verification link.
                    </p>
                    <button
                      onClick={handleResendVerification}
                      disabled={resendLoading}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition disabled:opacity-50 text-sm font-medium"
                    >
                      {resendLoading ? 'Sending...' : 'Resend Verification Email'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-3xl font-bold">
                  {userData.displayName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">{userData.displayName}</h2>
                  <p className="text-muted-foreground">InfYNova Member</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="font-medium">{userData.phoneNumber || 'Not provided'}</p>
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Member Since</p>
                    <p className="font-medium">
                      {userData.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Email Verified Status */}
                <div className="flex items-start gap-3">
                  {user.emailVerified ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mt-1" />
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email Status</p>
                    <p className={`font-medium ${user.emailVerified ? 'text-green-500' : 'text-red-500'}`}>
                      {user.emailVerified ? 'Verified' : 'Not Verified'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Account Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-3 gap-4"
            >
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl font-bold mb-1">1</p>
                <p className="text-sm text-muted-foreground">Account</p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <p className="text-2xl font-bold mb-1">{user.emailVerified ? 'Verified' : 'Pending'}</p>
                <p className="text-sm text-muted-foreground">Status</p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-2xl font-bold mb-1">Active</p>
                <p className="text-sm text-muted-foreground">Account</p>
              </div>
            </motion.div>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-primary/5 border border-primary/20 rounded-xl p-6"
            >
              <h3 className="font-semibold mb-2">Welcome to InfYNova!</h3>
              <p className="text-sm text-muted-foreground">
                You're now part of the InfYNova community. Stay tuned for exclusive updates, 
                early access to new features, and special offers on our AI-powered smartphones.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
