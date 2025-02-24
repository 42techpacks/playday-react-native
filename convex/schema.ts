import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const schema = defineSchema({
  ...authTables,
  daylists: defineTable({
    userId: v.string(),
    caption: v.string(),
    date: v.number(),
    songs: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        artists: v.array(
          v.object({
            name: v.string()
          })
        )
      })
    )
  })
});

export default schema;