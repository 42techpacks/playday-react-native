import { Id } from "../_generated/dataModel";
import { MutationCtx, QueryCtx } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export async function getCurrentUser(ctx: QueryCtx) {
  const userIdentity = await getAuthUserId(ctx);
  if (userIdentity === null) {
    return null;
  }
  const user = await ctx.db.get(userIdentity);
  const spotifyToken = await ctx.db
    .query("spotifyTokens")
    .withIndex("by_userId", (q) => q.eq("userId", userIdentity))
    .unique();
  const userProfile = await ctx.db
    .query("users")
    .withIndex("by_id", (q) => q.eq("_id", userIdentity))
    .unique();

  return { user, spotifyToken: spotifyToken, profile: userProfile };
}

export async function addUsername(
  ctx: MutationCtx,
  { username }: { username: string },
) {
  const userId = await getAuthUserId(ctx);
  if (userId === null) {
    throw new Error("Unauthorized");
  }
  const existing = await ctx.db
    .query("users")
    .withIndex("by_username", (q) => q.eq("username", username))
    .first();
  if (existing !== null) {
    throw new Error(
      `In table "users" cannot create duplicate document with field "username"\
      of value ${username}`,
    );
  }
  await ctx.db.patch(userId, {
    username: username.toLowerCase(),
  });
}
