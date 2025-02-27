import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    caption: v.string(),
    songs: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        artists: v.array(
          v.object({
            name: v.string(),
          })
        ),
      })
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    return await ctx.db.insert("daylists", {
      userId,
      caption: args.caption,
      date: Date.now(),
      songs: args.songs,
    });
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("daylists").order("desc").take(10);
  },
});
