// Twitter API v2 integration

interface TwitterPost {
  id: string;
  text: string;
  author_id: string;
  created_at: string;
  public_metrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
  };
  entities?: {
    hashtags?: Array<{ tag: string }>;
    urls?: Array<{ expanded_url: string }>;
  };
}

interface TwitterUser {
  id: string;
  username: string;
  name: string;
}

interface TwitterSearchResponse {
  data?: TwitterPost[];
  includes?: {
    users?: TwitterUser[];
  };
  meta: {
    result_count: number;
    next_token?: string;
  };
}

// Search recent tweets by hashtag
export async function searchTweetsByHashtag(
  hashtag: string,
  maxResults: number = 100
): Promise<{ tweets: TwitterPost[]; users: Map<string, TwitterUser> }> {
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;
  
  if (!bearerToken) {
    console.error('Twitter bearer token not configured');
    return { tweets: [], users: new Map() };
  }

  try {
    const cleanHashtag = hashtag.replace('#', '');
    const query = `#${cleanHashtag} -is:retweet -is:reply`;
    
    const response = await fetch(
      `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(query)}&max_results=${maxResults}&tweet.fields=created_at,public_metrics,entities,author_id&expansions=author_id&user.fields=username,name`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Twitter API error:', error);
      return { tweets: [], users: new Map() };
    }

    const data: TwitterSearchResponse = await response.json();
    
    // Create user map
    const userMap = new Map<string, TwitterUser>();
    if (data.includes?.users) {
      data.includes.users.forEach(user => {
        userMap.set(user.id, user);
      });
    }

    return {
      tweets: data.data || [],
      users: userMap,
    };
  } catch (error) {
    console.error('Search tweets error:', error);
    return { tweets: [], users: new Map() };
  }
}

// Track multiple hashtags
export async function trackTwitterHashtags(hashtags: string[]): Promise<{
  tweets: TwitterPost[];
  users: Map<string, TwitterUser>;
}> {
  const allTweets: TwitterPost[] = [];
  const allUsers = new Map<string, TwitterUser>();

  for (const hashtag of hashtags) {
    try {
      const { tweets, users } = await searchTweetsByHashtag(hashtag, 100);
      
      allTweets.push(...tweets);
      users.forEach((user, id) => allUsers.set(id, user));
      
      console.log(`Found ${tweets.length} tweets for ${hashtag}`);
      
      // Rate limiting: wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error tracking ${hashtag}:`, error);
    }
  }

  // Deduplicate tweets
  const uniqueTweets = Array.from(
    new Map(allTweets.map(tweet => [tweet.id, tweet])).values()
  );

  return {
    tweets: uniqueTweets,
    users: allUsers,
  };
}

// Get tweet details
export async function getTweetDetails(tweetId: string): Promise<TwitterPost | null> {
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;
  
  if (!bearerToken) {
    console.error('Twitter bearer token not configured');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.twitter.com/2/tweets/${tweetId}?tweet.fields=created_at,public_metrics,entities,author_id&expansions=author_id&user.fields=username,name`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Get tweet details error:', error);
    return null;
  }
}

// Get user by username
export async function getUserByUsername(username: string): Promise<TwitterUser | null> {
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;
  
  if (!bearerToken) {
    console.error('Twitter bearer token not configured');
    return null;
  }

  try {
    const cleanUsername = username.replace('@', '');
    const response = await fetch(
      `https://api.twitter.com/2/users/by/username/${cleanUsername}?user.fields=username,name`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

// Calculate engagement score for Twitter
export function calculateTwitterEngagement(metrics: TwitterPost['public_metrics']): number {
  return (
    metrics.like_count +
    (metrics.reply_count * 2) +
    (metrics.retweet_count * 3) +
    (metrics.quote_count * 3)
  );
}

// Validate bearer token
export async function validateBearerToken(): Promise<boolean> {
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;
  
  if (!bearerToken) {
    return false;
  }

  try {
    const response = await fetch(
      'https://api.twitter.com/2/tweets/search/recent?query=test&max_results=10',
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.ok;
  } catch (error) {
    console.error('Validate token error:', error);
    return false;
  }
}

// Get tweet URL
export function getTweetUrl(username: string, tweetId: string): string {
  return `https://twitter.com/${username}/status/${tweetId}`;
}
