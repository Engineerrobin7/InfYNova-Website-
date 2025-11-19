"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Link as LinkIcon, Instagram, Twitter, Facebook, CheckCircle } from "lucide-react";
import { submitEntry } from "@/app/lib/hashtag-tracker";
import { toast } from "sonner";
import { trackChallengeSubmission } from "@/app/lib/gtm";

interface SubmitChallengeEntryProps {
  challengeId: number;
  hashtag: string;
  onClose: () => void;
}

export function SubmitChallengeEntry({ challengeId, hashtag, onClose }: SubmitChallengeEntryProps) {
  const [platform, setPlatform] = useState<'instagram' | 'twitter' | 'facebook' | 'tiktok'>('instagram');
  const [username, setUsername] = useState('');
  const [postUrl, setPostUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !postUrl) {
      toast.error("Please fill in all fields");
      return;
    }

    // Validate URL format
    if (!postUrl.startsWith('http')) {
      toast.error("Please enter a valid URL");
      return;
    }

    setSubmitting(true);

    try {
      await submitEntry({
        platform,
        hashtag,
        username,
        postUrl,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0,
        shares: 0,
      });

      setSubmitted(true);
      
      // Track with GTM
      trackChallengeSubmission({
        challengeName: hashtag,
        platform: platform,
        username: username,
      });
      
      toast.success("Entry submitted successfully!", {
        description: "We'll review your entry and notify you if you win!"
      });

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      toast.error("Failed to submit entry", {
        description: "Please try again later"
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Entry Submitted!</h3>
        <p className="text-muted-foreground">
          We'll review your entry and contact you if you're a winner!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center">Submit Your Entry</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Platform Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">Select Platform</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'instagram', icon: Instagram, label: 'Instagram' },
              { value: 'twitter', icon: Twitter, label: 'Twitter' },
              { value: 'facebook', icon: Facebook, label: 'Facebook' },
            ].map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPlatform(p.value as any)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  platform === p.value
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <p.icon className="w-6 h-6 mx-auto mb-2" />
                <span className="text-xs font-medium">{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Your Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="@yourusername"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:outline-none"
            required
          />
        </div>

        {/* Post URL */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Post URL
          </label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="url"
              value={postUrl}
              onChange={(e) => setPostUrl(e.target.value)}
              placeholder="https://instagram.com/p/..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:outline-none"
              required
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Make sure your post includes the hashtag: <span className="font-semibold text-primary">{hashtag}</span>
          </p>
        </div>

        {/* Requirements */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-sm">Requirements:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>✓ Post must include {hashtag}</li>
            <li>✓ Post must be public</li>
            <li>✓ Account must not be private</li>
            <li>✓ Follow @infynova_tech</li>
          </ul>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-border rounded-lg hover:bg-muted transition font-semibold"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition font-semibold disabled:opacity-50"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </span>
            ) : (
              'Submit Entry'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
