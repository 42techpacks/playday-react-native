import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const schema = defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    // other "users" fields...
    username: v.optional(v.string()),
  }).index("by_username", ["username"])
    .index("by_phone", ["phone"]),

  daylists: defineTable({
    userId: v.string(),
    caption: v.string(),
    date: v.number(),
    songs: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        imageUrl: v.optional(v.string()),
        artists: v.array(
          v.object({
            name: v.string(),
          }),
        ),
      }),
    ),
  }),
  spotifyTokens: defineTable({
    userId: v.string(),
    accessToken: v.string(),
    refreshToken: v.string(),
    expirationDate: v.number(), // Unix timestamp in milliseconds
    lastUpdated: v.number(), // Unix timestamp in milliseconds
  }).index("by_userId", ["userId"]),
});

export default schema;
