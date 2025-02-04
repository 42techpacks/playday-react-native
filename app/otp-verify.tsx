/* This is the OTP verification screen. Users must input the six-digit code sent to their 
previously-submitted phone number.
*/

import { View, Text, Alert } from "react-native";
import RegisterButton from "../components/register-button";
import OTPInput from "../components/otp"
import { Authenticated } from "convex/react";
import { Redirect } from "expo-router";
import React, { useState } from "react";

const OTPVerify: React.FC = () => {
  const [OTP, setOTP] = useState('');

  {/* Needs to be changed to verify button */}
  const handlePress = () => {
    Alert.alert('Button Pressed', 'You clicked the register button!');
  };

  return (
    <>
      <Authenticated>
        <Redirect href="/" />
      </Authenticated>
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
