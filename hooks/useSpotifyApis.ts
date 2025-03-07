import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  spotifyApi,
  type SpotifyTrack,
  type SpotifyPlaylist,
} from "@/lib/spotify";
import { useRef, useCallback } from "react";
import { useSpotifyAuth } from "./useSpotifyAuth";

// Query keys for Spotify API operations
export const spotifyKeys = {
  all: ["spotify"] as const,
  search: (query: string) => [...spotifyKeys.all, "search", query] as const,
  playlists: () => [...spotifyKeys.all, "playlists"] as const,
  userProfile: () => [...spotifyKeys.all, "userProfile"] as const,
  trackImages: (trackIds: string[]) =>
    [...spotifyKeys.all, "trackImages", ...trackIds] as const,
};

/**
 * Hook for searching tracks on Spotify
 */
export function useSpotifySearch(query: string) {
  const { getAccessToken, isAuthenticated } = useSpotifyAuth();
  const queryRef = useRef(query);
  queryRef.current = query;
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: spotifyKeys.search(query),
    queryFn: async () => {
      const accessToken = await getAccessToken();
      if (!accessToken) throw new Error("No access token available");
      return spotifyApi.searchTracks(queryRef.current, accessToken);
    },
    enabled: isAuthenticated && query.trim().length >= 2,
  });
}

/**
 * Hook for fetching user's playlists
 */
export function useUserPlaylists() {
  const { getAccessToken, isAuthenticated } = useSpotifyAuth();

  return useQuery({
    queryKey: spotifyKeys.playlists(),
    queryFn: async () => {
      const accessToken = await getAccessToken();
      if (!accessToken) throw new Error("No access token available");
      return spotifyApi.getUserPlaylists(accessToken);
    },
    enabled: isAuthenticated,
  });
}

/**
 * Hook for fetching user profile
 */
export function useUserProfile() {
  const { getAccessToken, isAuthenticated } = useSpotifyAuth();

  return useQuery({
    queryKey: spotifyKeys.userProfile(),
    queryFn: async () => {
      const accessToken = await getAccessToken();
      if (!accessToken) throw new Error("No access token available");
      return spotifyApi.getCurrentUserProfile(accessToken);
    },
    enabled: isAuthenticated,
  });
}

/**
 * Hook for creating a playlist
 */
export function useCreatePlaylist() {
  const { getAccessToken } = useSpotifyAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      name,
      description,
      isPublic = false,
    }: {
      userId: string;
      name: string;
      description: string;
      isPublic?: boolean;
    }) => {
      const accessToken = await getAccessToken();
      if (!accessToken) throw new Error("No access token available");
      return spotifyApi.createPlaylist(
        userId,
        name,
        description,
        isPublic,
        accessToken
      );
    },
    onSuccess: () => {
      // Invalidate playlists query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: spotifyKeys.playlists() });
    },
  });
}

/**
 * Hook for adding tracks to a playlist
 */
export function useAddTracksToPlaylist() {
  const { getAccessToken } = useSpotifyAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      playlistId,
      trackUris,
    }: {
      playlistId: string;
      trackUris: string[];
    }) => {
      const accessToken = await getAccessToken();
      if (!accessToken) throw new Error("No access token available");
      return spotifyApi.addTracksToPlaylist(playlistId, trackUris, accessToken);
    },
    onSuccess: () => {
      // Invalidate playlists query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: spotifyKeys.playlists() });
    },
  });
}

/**
 * Hook for fetching album images for multiple tracks
 */
export function useTrackImages(trackIds: string[]) {
  const { getAccessToken, isAuthenticated, isRefreshing } = useSpotifyAuth();

  return useQuery<string[]>({
    queryKey: spotifyKeys.trackImages(trackIds),
    queryFn: async () => {
      if (!trackIds.length) return [];

      const accessToken = await getAccessToken();
      if (!accessToken) throw new Error("No access token available");

      // Fetch images sequentially to avoid rate limiting
      const images: string[] = [];

      for (const trackId of trackIds) {
        try {
          const response = await fetch(
            `https://api.spotify.com/v1/tracks/${trackId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (!response.ok) {
            console.error(
              `Failed to fetch track ${trackId}: ${response.statusText}`
            );
            images.push("");
            continue;
          }

          const track = await response.json();
          images.push(track.album.images[0]?.url || "");

          // Add a small delay between requests to avoid rate limiting
          if (trackIds.length > 1) {
            await new Promise((resolve) => setTimeout(resolve, 300));
          }
        } catch (error) {
          console.error(`Error fetching track ${trackId}:`, error);
          images.push("");
        }
      }

      return images;
    },
    enabled: isAuthenticated && trackIds.length > 0 && !isRefreshing,
    staleTime: Infinity, // Cache for 1 hour
    gcTime: Infinity, // Keep in cache for 24 hours
  });
}

/**
 * Hook that provides a function to execute any Spotify API request
 * This is useful for one-off API calls that don't need caching
 */
export function useSpotifyApi() {
  const { getAccessToken, isAuthenticated } = useSpotifyAuth();

  const executeRequest = useCallback(
    async <T>(apiCall: (accessToken: string) => Promise<T>): Promise<T> => {
      const accessToken = await getAccessToken();
      if (!accessToken) throw new Error("No access token available");
      return apiCall(accessToken);
    },
    [getAccessToken]
  );

  return {
    executeRequest,
    isAuthenticated,
  };
}
