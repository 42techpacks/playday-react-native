import Github from "@auth/core/providers/github";
import { convexAuth } from "@convex-dev/auth/server";
import { action } from "./_generated/server";
import { v } from "convex/values";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const serviceSid = process.env.TWILIO_SERVICE_SID!;

// Send OTP
export const sendOtp = action({
  args: { phoneNumber: v.string() },
  handler: async (_, { phoneNumber }) => {
    try {
      const response = await fetch(
        `https://verify.twilio.com/v2/Services/${serviceSid}/Verifications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
          },
          body: new URLSearchParams({
            To: phoneNumber,
            Channel: "sms",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to send OTP. Status: ${response.status}`);
      }

      return { success: true, message: "OTP sent successfully!" };
    } catch (error) {
      const err = error as Error;
      throw new Error("Failed to send OTP. " + err.message);
    }
  },
});
// Verify OTP
export const verifyOtp = action({
  args: { phoneNumber: v.string(), otp: v.string() },
  handler: async (_, { phoneNumber, otp }) => {
    try {
      const response = await fetch(
        `https://verify.twilio.com/v2/Services/${serviceSid}/VerificationCheck`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
          },
          body: new URLSearchParams({
            To: phoneNumber,
            Code: otp,
          }),
        }
      );

      const data = await response.json();
      console.log("Twilio Verify Response:", data);

      if (!data.valid) {
        throw new Error(`OTP verification failed. Twilio response: ${JSON.stringify(data)}`);
      }

      return { success: true, message: "OTP verified!" };
    } catch (error) {
      const err = error as Error;
      throw new Error("OTP verification failed. " + err.message);
    }
  },
});

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Github],
});

