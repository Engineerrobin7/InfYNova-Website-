// Hashtag tracking utilities

export interface HashtagEntry {
  id: string;
  platform: 'instagram' | 'twitter' | 'facebook' | 'tiktok';
  hashtag: string;
  username: string;
  postUrl: string;
  mediaUrl?: string;
  caption?: string;
  timestamp: string;
  verified: boolean;
  rewarded: boolean;
  rewardAmount?: number;
  likes: number;
  comments: number;
  shares: number;
  engagement?: number;
}

export interface Challenge {
  id: number;
  hashtag: string;
  title: string;
  description: string;
  prize: string;
  prizeAmount: number;
  startDate: string;
  endDate: string;
  minEngagement?: number;
  rules: string[];
  active: boolean;
}

// Calculate engagement score
export const calculateEngagement = (entry: HashtagEntry): number => {
  return entry.likes + (entry.comments * 2) + (entry.shares * 3);
};

// Check if entry meets challenge requirements
export const validateEntry = (entry: HashtagEntry, challenge: Challenge): boolean => {
  // Check if hashtag matches
  if (!entry.caption?.toLowerCase().includes(challenge.hashtag.toLowerCase())) {
    return false;
  }

  // Check if meets minimum engagement
  if (challenge.minEngagement && calculateEngagement(entry) < challenge.minEngagement) {
    return false;
  }

  // Check if within challenge dates
  const entryDate = new Date(entry.timestamp);
  const startDate = new Date(challenge.startDate);
  const endDate = new Date(challenge.endDate);

  if (entryDate < startDate || entryDate > endDate) {
    return false;
  }

  return true;
};

// Get leaderboard for a challenge
export const getLeaderboard = (entries: HashtagEntry[]): HashtagEntry[] => {
  return entries
    .map(entry => ({
      ...entry,
      engagement: calculateEngagement(entry)
    }))
    .sort((a, b) => (b.engagement || 0) - (a.engagement || 0));
};

// Instagram hashtag tracking (requires Instagram Graph API)
export const trackInstagramHashtag = async (hashtag: string, accessToken: string) => {
  try {
    // Note: This requires Instagram Business Account and approved app
    const response = await fetch(
      `https://graph.instagram.com/ig_hashtag_search?user_id=YOUR_USER_ID&q=${encodeURIComponent(hashtag)}&access_token=${accessToken}`
    );
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Instagram tracking error:', error);
    throw error;
  }
};

// Twitter/X hashtag tracking (requires Twitter API v2)
export const trackTwitterHashtag = async (hashtag: string, bearerToken: string) => {
  try {
    const response = await fetch(
      `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(hashtag)}&max_results=100`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      }
    );
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Twitter tracking error:', error);
    throw error;
  }
};

// Manual entry submission (for users to submit their posts)
export const submitEntry = async (entry: Omit<HashtagEntry, 'id' | 'verified' | 'rewarded'>) => {
  try {
    const response = await fetch('/api/track-hashtag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Submit entry error:', error);
    throw error;
  }
};

// Get entries for a specific challenge
export const getChallengeEntries = async (hashtag: string, limit: number = 50) => {
  try {
    const response = await fetch(`/api/track-hashtag?hashtag=${encodeURIComponent(hashtag)}&limit=${limit}`);
    const data = await response.json();
    return data.entries || [];
  } catch (error) {
    console.error('Get entries error:', error);
    throw error;
  }
};
