import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";

// Create a new task with the given text
export const createPost = mutation({
  args: { title: v.string(), content: v.string()},
    handler: async (ctx, args) => {
      const user = await authComponent.safeGetAuthUser(ctx);
      if (!user) {
        // return user;
        throw new Error("Unauthorized");
      }
    const newPostId = await ctx.db.insert("posts", { title: args.title, content: args.content, authorId: user._id });
    return newPostId;
  },
});