/* This is the OTP verification screen. Users must input the six-digit code sent to their
previously-submitted phone number.
*/

import { View, Text, Alert, Button } from "react-native";
import RegisterButton from "@/components/auth-inputs/register-button";
import OTPInput from "@/components/auth-inputs/otp"
import { Authenticated } from "convex/react";
import { Redirect, useRouter } from "expo-router";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

const OTPVerify: React.FC = () => {
  const [OTP, setOTP] = useState('');
  const router = useRouter();

  {/* Needs to be changed to verify button */}
  const handlePress = () => {
    Alert.alert('Button Pressed', 'You clicked the register button!');
  };

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 24, marginBottom: 10 }}>finyl</Text>
        <Text style={{ fontSize: 14, marginBottom: 200 }}>Welcome back.</Text>

      <OTPInput
        label="OTP Verification"
        value={OTP}
        onChangeText={setOTP}
      />
    {/* Needs to be changed to verify button */}
    <RegisterButton title = "Verify" onPress={handlePress} />

      </View>
    </>
  );
};
  export default OTPVerify;
