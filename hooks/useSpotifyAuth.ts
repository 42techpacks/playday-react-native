import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { isAvailable, Authenticate } from "expo-spotify-sdk";
import { Id } from "@/convex/_generated/dataModel";

// Query keys for React Query
export const spotifyAuthKeys = {
  tokens: ["spotify", "tokens"] as const,
};

// Define the token response type
interface TokenResponse {
  accessToken?: string;
  refreshToken?: string;
  expirationDate?: number;
  needsRefresh?: boolean;
  tokenId?: Id<"spotifyTokens">;
}

/**
 * Hook to manage Spotify authentication tokens
 * Handles fetching, refreshing, and providing tokens for API calls
 */
export function useSpotifyAuth() {
  const convex = useConvex();
  const queryClient = useQueryClient();

  // Query to fetch tokens from Convex
  const tokensQuery = useQuery<TokenResponse | null>({
    queryKey: spotifyAuthKeys.tokens,
    queryFn: async () => {
      try {
        return await convex.query(api.spotifyAuth.getTokens);
      } catch (error) {
        console.error("Failed to fetch Spotify tokens:", error);
        return null;
      }
    },
  });

  // Mutation to refresh the token when needed
  const refreshTokenMutation = useMutation({
    mutationFn: async ({ refreshToken, tokenId }: { refreshToken: string; tokenId?: Id<"spotifyTokens"> }) => {
      return await convex.action(api.spotifyAuth.refreshToken, { refreshToken, tokenId });
    },
    onSuccess: () => {
      // Invalidate the tokens query to fetch the updated tokens
      queryClient.invalidateQueries({ queryKey: spotifyAuthKeys.tokens });
    },
  });

  // Mutation to save tokens after initial authentication
  const saveTokensMutation = useMutation({
    mutationFn: async (tokens: { accessToken: string; refreshToken: string; expirationDate: number }) => {
      return await convex.mutation(api.spotifyAuth.saveTokens, tokens);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: spotifyAuthKeys.tokens });
    },
  });

  // Get the current valid access token, refreshing if needed
  const getAccessToken = async (): Promise<string | null> => {
    const tokens = tokensQuery.data;

    if (!tokens) return null;

    // If token needs refresh, refresh it
    if (tokens.needsRefresh && tokens.refreshToken && tokens.tokenId) {
      try {
        await refreshTokenMutation.mutateAsync({
          refreshToken: tokens.refreshToken,
          tokenId: tokens.tokenId,
        });
        // After refresh, the query will be invalidated and re-fetched
        const updatedTokens = queryClient.getQueryData<TokenResponse>(spotifyAuthKeys.tokens);
        return updatedTokens?.accessToken || null;
      } catch (error) {
        console.error("Failed to refresh token:", error);
        return null;
      }
    }

    return tokens.accessToken || null;
  };

  // Authenticate with Spotify and save tokens
  const authenticateWithSpotify = async () => {
    try {
      const result = await Authenticate.authenticateAsync({
        scopes: [
          "ugc-image-upload",
          "user-read-playback-state",
          "user-modify-playback-state",
          "user-read-currently-playing",
          "app-remote-control",
          "streaming",
          "playlist-read-private",
          "playlist-read-collaborative",
          "playlist-modify-private",
          "playlist-modify-public",
          "user-follow-modify",
          "user-follow-read",
          "user-top-read",
          "user-read-recently-played",
          "user-library-modify",
          "user-library-read",
          "user-read-email",
          "user-read-private",
        ],
      });

      if (result.accessToken) {
        await saveTokensMutation.mutateAsync({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          expirationDate: result.expirationDate,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Spotify authentication failed:", error);
      return false;
    }
  };

  return {
    isAuthenticated: !!tokensQuery.data?.accessToken,
    isLoading: tokensQuery.isLoading,
    isRefreshing: refreshTokenMutation.isPending,
    getAccessToken,
    authenticateWithSpotify,
    isSpotifyAvailable: isAvailable,
  };
}