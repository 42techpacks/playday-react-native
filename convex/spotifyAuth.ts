import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

// Function to save Spotify authentication tokens
export const saveTokens = mutation({
  args: {
    accessToken: v.string(),
    refreshToken: v.string(),
    expirationDate: v.number(),
  },
  handler: async (ctx, args) => {
    // Get the authenticated user's identity
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User not authenticated");
    }

    const userId = identity.tokenIdentifier;
    const now = Date.now();

    // Check if the user already has tokens stored
    const existingTokens = await ctx.db
      .query("spotifyTokens")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    if (existingTokens) {
      // Update existing entry
      return await ctx.db.patch(existingTokens._id, {
        accessToken: args.accessToken,
        refreshToken: args.refreshToken,
        expirationDate: args.expirationDate,
        lastUpdated: now,
      });
    } else {
      // Create new entry
      return await ctx.db.insert("spotifyTokens", {
        userId,
        accessToken: args.accessToken,
        refreshToken: args.refreshToken,
        expirationDate: args.expirationDate,
        lastUpdated: now,
      });
    }
  },
});

// Helper function to refresh the access token
async function refreshSpotifyToken(refreshToken: string): Promise<{ accessToken: string; expirationDate: number }> {
  // Your Spotify API credentials
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Spotify API credentials not configured");
  }

  const tokenEndpoint = "https://accounts.spotify.com/api/token";
  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${authString}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to refresh Spotify token: ${response.statusText}`);
  }

  const data = await response.json();

  return {
    accessToken: data.access_token,
    // Convert expiration seconds to milliseconds and add to current time
    expirationDate: Date.now() + data.expires_in * 1000,
  };
}

// Action to refresh the token
export const refreshToken = action({
  args: {
    refreshToken: v.string(),
    tokenId: v.optional(v.id("spotifyTokens")),
  },
  handler: async (ctx, args) => {
    try {
      const refreshedTokens = await refreshSpotifyToken(args.refreshToken);

      // If we have a tokenId, update the database
      if (args.tokenId) {
        await ctx.runMutation(api.spotifyAuth.updateTokens, {
          tokenId: args.tokenId,
          accessToken: refreshedTokens.accessToken,
          expirationDate: refreshedTokens.expirationDate,
        });
      }

      return refreshedTokens;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      throw error;
    }
  },
});

// Query to get tokens, checking if refresh is needed
export const getTokens = query({
  args: {},
  handler: async (ctx) => {
    // Get the authenticated user's identity
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User not authenticated");
    }

    const userId = identity.tokenIdentifier;

    // Retrieve tokens from the database
    const tokens = await ctx.db
      .query("spotifyTokens")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    if (!tokens) {
      return null; // User hasn't connected Spotify yet
    }

    // Check if token will expire in less than 5 minutes
    const fiveMinutesInMs = 5 * 60 * 1000;
    const tokenExpiresInMs = tokens.expirationDate - Date.now();

    // If token is still valid for more than 5 minutes, return it
    if (tokenExpiresInMs >= fiveMinutesInMs) {
      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expirationDate: tokens.expirationDate,
        needsRefresh: false,
      };
    }

    // Otherwise, indicate that the client should call the refreshToken action
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expirationDate: tokens.expirationDate,
      needsRefresh: true,
      tokenId: tokens._id,
    };
  },
});

// Mutation to update tokens after refreshing
export const updateTokens = mutation({
  args: {
    tokenId: v.id("spotifyTokens"),
    accessToken: v.string(),
    expirationDate: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.tokenId, {
      accessToken: args.accessToken,
      expirationDate: args.expirationDate,
      lastUpdated: Date.now(),
    });
  },
});