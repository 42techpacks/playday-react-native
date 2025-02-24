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

// Keep API client functions separate from hooks
export const spotifyApi = {
  searchTracks: async (
    query: string,
    accessToken: string
  ): Promise<SpotifyTrack[]> => {
    console.log("in searchTracks");
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
      throw new Error("Failed to search tracks");
    }

    const data = await response.json();
    return data.tracks.items;
  },
};
