// Core business logic, types, and API client
export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
  duration_ms: number;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  tracks: {
    total: number;
  };
}

// Keep API client functions separate from hooks
export const spotifyApi = {
  // Search for tracks
  searchTracks: async (
    query: string,
    accessToken: string
  ): Promise<SpotifyTrack[]> => {
    if (!query.trim()) return [];

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to search tracks: ${response.statusText}`);
    }

    const data = await response.json();
    return data.tracks.items;
  },

  // Get user's playlists
  getUserPlaylists: async (accessToken: string): Promise<SpotifyPlaylist[]> => {
    const response = await fetch(
      "https://api.spotify.com/v1/me/playlists?limit=50",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get playlists: ${response.statusText}`);
    }

    const data = await response.json();
    return data.items;
  },

  // Create a playlist
  createPlaylist: async (
    userId: string,
    name: string,
    description: string,
    isPublic: boolean,
    accessToken: string
  ): Promise<SpotifyPlaylist> => {
    const response = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          public: isPublic,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to create playlist: ${response.statusText}`);
    }

    return await response.json();
  },

  // Add tracks to a playlist
  addTracksToPlaylist: async (
    playlistId: string,
    trackUris: string[],
    accessToken: string
  ): Promise<void> => {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: trackUris,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to add tracks to playlist: ${response.statusText}`);
    }
  },

  // Get current user profile
  getCurrentUserProfile: async (accessToken: string) => {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get user profile: ${response.statusText}`);
    }

    return await response.json();
  },
};
