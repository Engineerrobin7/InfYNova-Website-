"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { 
  CheckCircle, 
  XCircle, 
  ExternalLink, 
  Trophy, 
  TrendingUp,
  Filter,
  RefreshCw,
  Instagram,
  Twitter,
  Facebook
} from "lucide-react";
import { toast } from "sonner";

interface Entry {
  id: string;
  platform: string;
  hashtag: string;
  username: string;
  postUrl: string;
  timestamp: string;
  verified: boolean;
  rewarded: boolean;
  rewardAmount: number;
  likes: number;
  comments: number;
  shares: number;
  engagement: number;
}

export default function AdminChallengesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'verified'>('all');
  const [selectedHashtag, setSelectedHashtag] = useState<string>('all');

  // Check authentication
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/dashboard?redirect=/admin/challenges');
    }
  }, [user, authLoading, router]);

  const hashtags = [
    'all',
    '#InfyNovaUnboxChallenge',
    '#NovaOSDanceChallenge',
    '#AIPhoneArtChallenge',
    '#InfyNovaMemeChallenge'
  ];

  useEffect(() => {
    loadEntries();
  }, [selectedHashtag]);

  const loadEntries = async () => {
    setLoading(true);
    try {
      const url = selectedHashtag === 'all' 
        ? '/api/track-hashtag?limit=100'
        : `/api/track-hashtag?hashtag=${encodeURIComponent(selectedHashtag)}&limit=100`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setEntries(data.entries || []);
      } else {
        toast.error('Failed to load entries');
      }
    } catch (error) {
      console.error('Load entries error:', error);
      toast.error('Failed to load entries');
    } finally {
      setLoading(false);
    }
  };

  const verifyEntry = async (entryId: string, verified: boolean, reward?: number) => {
    try {
      const response = await fetch('/api/verify-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          entryId, 
          verified,
          reward: reward || 0,
          likes: 0, // You can update these manually
          comments: 0,
          shares: 0
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success(verified ? 'Entry verified!' : 'Entry rejected');
        loadEntries();
      } else {
        toast.error(data.error || 'Failed to update entry');
      }
    } catch (error) {
      console.error('Verify entry error:', error);
      toast.error('Failed to update entry');
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'facebook': return <Facebook className="w-4 h-4" />;
      default: return null;
    }
  };

  const filteredEntries = entries.filter(entry => {
    if (filter === 'pending') return !entry.verified;
    if (filter === 'verified') return entry.verified;
    return true;
  });

  const stats = {
    total: entries.length,
    pending: entries.filter(e => !e.verified).length,
    verified: entries.filter(e => e.verified).length,
    rewarded: entries.filter(e => e.rewarded).length,
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Challenge Entries</h1>
              <p className="text-muted-foreground">Review and verify user submissions</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  try {
                    const response = await fetch('/api/admin/trigger-tracking', {
                      method: 'POST',
                    });
                    const data = await response.json();
                    if (data.success) {
                      toast.success('Tracking triggered!', {
                        description: `Found ${data.data.results.instagram.new + data.data.results.twitter.new} new posts`
                      });
                      loadEntries();
                    } else {
                      toast.error('Failed to trigger tracking');
                    }
                  } catch (error) {
                    toast.error('Failed to trigger tracking');
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                <TrendingUp className="w-4 h-4" />
                Track Now
              </button>
              <button
                onClick={loadEntries}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Entries', value: stats.total, icon: Trophy, color: 'text-blue-500' },
            { label: 'Pending Review', value: stats.pending, icon: Filter, color: 'text-yellow-500' },
            { label: 'Verified', value: stats.verified, icon: CheckCircle, color: 'text-green-500' },
            { label: 'Rewarded', value: stats.rewarded, icon: TrendingUp, color: 'text-purple-500' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex gap-2">
            {['all', 'pending', 'verified'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === f
                    ? 'bg-primary text-white'
                    : 'bg-card border border-border hover:bg-muted'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <select
            value={selectedHashtag}
            onChange={(e) => setSelectedHashtag(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-card"
          >
            {hashtags.map((tag) => (
              <option key={tag} value={tag}>
                {tag === 'all' ? 'All Challenges' : tag}
              </option>
            ))}
          </select>
        </div>

        {/* Entries List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading entries...</p>
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No entries found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Entry Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {getPlatformIcon(entry.platform)}
                          <span className="font-bold text-lg">{entry.username}</span>
                          {entry.verified && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                          {entry.rewarded && (
                            <Trophy className="w-5 h-5 text-yellow-500" />
                          )}
                        </div>
                        <p className="text-sm text-primary font-semibold">{entry.hashtag}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(entry.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <a
                      href={entry.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-4"
                    >
                      View Post <ExternalLink className="w-4 h-4" />
                    </a>

                    {/* Engagement Stats */}
                    <div className="flex gap-4 text-sm">
                      <span>❤️ {entry.likes || 0} likes</span>
                      <span>💬 {entry.comments || 0} comments</span>
                      <span>🔄 {entry.shares || 0} shares</span>
                      <span className="font-semibold">
                        📊 {entry.engagement || 0} engagement
                      </span>
                    </div>

                    {entry.rewarded && (
                      <div className="mt-3 inline-block px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-sm font-semibold">
                        💰 Rewarded: ₹{entry.rewardAmount?.toLocaleString() || 0}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  {!entry.verified && (
                    <div className="flex md:flex-col gap-2">
                      <button
                        onClick={() => verifyEntry(entry.id, true, 50000)}
                        className="flex-1 md:flex-none px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Verify & Reward
                      </button>
                      <button
                        onClick={() => verifyEntry(entry.id, false)}
                        className="flex-1 md:flex-none px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
