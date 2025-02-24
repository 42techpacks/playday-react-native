import { isAvailable, Authenticate } from "expo-spotify-sdk";
import { create } from "zustand";
import { useQuery } from "@tanstack/react-query";
import { spotifyApi, type SpotifyTrack } from "@/lib/spotify";
import { useRef } from "react";

// Zustand store for auth state only
const useSpotifyStore = create<{
  accessToken: string | null;
  actions: {
    setAccessToken: (token: string | null) => void;
  };
}>((set) => ({
  accessToken: null,
  actions: {
    setAccessToken: (token) => set({ accessToken: token }),
  },
}));

export const useSpotifyToken = () =>
  useSpotifyStore((state) => state.accessToken);
export const useSpotifyActions = () =>
  useSpotifyStore((state) => state.actions);

// Remove the search store and its exports
export const spotifyKeys = {
  all: ["spotify"] as const,
  search: (query: string) => [...spotifyKeys.all, "search", query] as const,
};

// Search hook with query logic
export function useSpotifySearch(query: string) {
  const accessToken = useSpotifyToken();
  const queryRef = useRef(query);
  queryRef.current = query;

  return useQuery({
    queryKey: spotifyKeys.search(query),
    queryFn: () => spotifyApi.searchTracks(queryRef.current, accessToken!),
    enabled: !!accessToken && query.trim().length >= 2,
    experimental_prefetchInRender: true,
  });
}

// Custom hooks for interacting with spotify native modules
export function useSpotifyAuthentication() {
  return {
    isAvailable,
    authenticateAsync: Authenticate.authenticateAsync,
  };
}
