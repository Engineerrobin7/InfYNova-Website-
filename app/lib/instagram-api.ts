// Instagram Graph API integration

interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  permalink: string;
  timestamp: string;
  like_count: number;
  comments_count: number;
  username: string;
}

interface InstagramHashtagResponse {
  data: Array<{
    id: string;
  }>;
}

// Get hashtag ID
export async function getHashtagId(hashtag: string, accessToken: string): Promise<string | null> {
  try {
    const cleanHashtag = hashtag.replace('#', '');
    const userId = process.env.INSTAGRAM_USER_ID;
    
    const response = await fetch(
      `https://graph.instagram.com/ig_hashtag_search?user_id=${userId}&q=${encodeURIComponent(cleanHashtag)}&access_token=${accessToken}`
    );

    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      return data.data[0].id;
    }
    
    return null;
  } catch (error) {
    console.error('Get hashtag ID error:', error);
    return null;
  }
}

// Get recent posts for a hashtag
export async function getHashtagPosts(
  hashtagId: string,
  accessToken: string,
  limit: number = 50
): Promise<InstagramPost[]> {
  try {
    const userId = process.env.INSTAGRAM_USER_ID;
    
    // Get recent media
    const response = await fetch(
      `https://graph.instagram.com/${hashtagId}/recent_media?user_id=${userId}&fields=id,caption,media_url,permalink,timestamp,like_count,comments_count,username&limit=${limit}&access_token=${accessToken}`
    );

    const data = await response.json();
    
    if (data.data) {
      return data.data;
    }
    
    return [];
  } catch (error) {
    console.error('Get hashtag posts error:', error);
    return [];
  }
}

// Get top posts for a hashtag
export async function getTopHashtagPosts(
  hashtagId: string,
  accessToken: string,
  limit: number = 25
): Promise<InstagramPost[]> {
  try {
    const userId = process.env.INSTAGRAM_USER_ID;
    
    const response = await fetch(
      `https://graph.instagram.com/${hashtagId}/top_media?user_id=${userId}&fields=id,caption,media_url,permalink,timestamp,like_count,comments_count,username&limit=${limit}&access_token=${accessToken}`
    );

    const data = await response.json();
    
    if (data.data) {
      return data.data;
    }
    
    return [];
  } catch (error) {
    console.error('Get top hashtag posts error:', error);
    return [];
  }
}

// Track all hashtags
export async function trackInstagramHashtags(hashtags: string[]): Promise<InstagramPost[]> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  
  if (!accessToken) {
    console.error('Instagram access token not configured');
    return [];
  }

  const allPosts: InstagramPost[] = [];

  for (const hashtag of hashtags) {
    try {
      // Get hashtag ID
      const hashtagId = await getHashtagId(hashtag, accessToken);
      
      if (!hashtagId) {
        console.log(`Hashtag ${hashtag} not found`);
        continue;
      }

      // Get recent posts
      const recentPosts = await getHashtagPosts(hashtagId, accessToken, 50);
      
      // Get top posts
      const topPosts = await getTopHashtagPosts(hashtagId, accessToken, 25);
      
      // Combine and deduplicate
      const combinedPosts = [...recentPosts, ...topPosts];
      const uniquePosts = Array.from(
        new Map(combinedPosts.map(post => [post.id, post])).values()
      );
      
      allPosts.push(...uniquePosts);
      
      console.log(`Found ${uniquePosts.length} posts for ${hashtag}`);
    } catch (error) {
      console.error(`Error tracking ${hashtag}:`, error);
    }
  }

  return allPosts;
}

// Get post details
export async function getPostDetails(postId: string, accessToken: string): Promise<InstagramPost | null> {
  try {
    const response = await fetch(
      `https://graph.instagram.com/${postId}?fields=id,caption,media_url,permalink,timestamp,like_count,comments_count,username&access_token=${accessToken}`
    );

    const data = await response.json();
    
    if (data.id) {
      return data;
    }
    
    return null;
  } catch (error) {
    console.error('Get post details error:', error);
    return null;
  }
}

// Refresh long-lived access token
export async function refreshAccessToken(currentToken: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`
    );

    const data = await response.json();
    
    if (data.access_token) {
      return data.access_token;
    }
    
    return null;
  } catch (error) {
    console.error('Refresh token error:', error);
    return null;
  }
}

// Validate access token
export async function validateAccessToken(accessToken: string): Promise<boolean> {
  try {
    const userId = process.env.INSTAGRAM_USER_ID;
    const response = await fetch(
      `https://graph.instagram.com/${userId}?fields=id,username&access_token=${accessToken}`
    );

    const data = await response.json();
    return !!data.id;
  } catch (error) {
    console.error('Validate token error:', error);
    return false;
  }
}
