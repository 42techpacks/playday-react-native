import Github from "@auth/core/providers/github";
import { TwilioVerify } from "./otp/TwilioVerify";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Github, TwilioVerify],
});
