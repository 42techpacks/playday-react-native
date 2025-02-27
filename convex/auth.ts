import Github from "@auth/core/providers/github";
import { TwilioVerify } from "./otp/TwilioVerify";
import { convexAuth } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import * as User from "./model/users";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Github, TwilioVerify],
});

// Query to check if a user needs to complete the registration flow
export const checkRegistrationStatus = query({
  args: {},
  handler: async (ctx) => {
    const user = await User.getCurrentUser(ctx);
    if (!user) {
      return { isAuthenticated: false, hasSpotifyTokens: false };
    }
    return {
      isAuthenticated: true,
      hasSpotifyTokens: !!user.spotifyToken,
      hasUsername: !!user.profile?.username,
    };
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const user = await User.getCurrentUser(ctx);
    if (!User) return null;
    return user;
  },
});

export const addUsername = mutation({
  args: { username: v.string() },
  handler: async (ctx, { username }) => {
    await User.addUsername(ctx, { username });
  },
});
