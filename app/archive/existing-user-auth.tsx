/* This is the authentication screen for an EXISTING user. They must input their phone number in order to log
in. There is also an option to redirect to the registration page.
*/

import { View, Text, Alert } from "react-native";
import RegisterButton from "@/components/auth-inputs/register-button";
import PhoneNumberInput from "@/components/auth-inputs/phone-number-input"
import { Authenticated } from "convex/react";
import { Redirect } from "expo-router";
import React, { useState } from "react";
import SignInButton from "@/components/auth-inputs/sign-in-button";

const ExistingUserScreen: React.FC = () => {
  const [text, setText] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneSubmit = () => {
    Alert.alert('Phone Number Submitted', `You entered: ${phoneNumber}`);
  };

  const handleSubmit = () => {
    Alert.alert('Submitted', `You entered: ${text}`);
  };

  const handlePress = () => {
    Alert.alert('Button Pressed', 'You clicked the register button!');
  };

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 24, marginBottom: 10 }}>finyl</Text>
        <Text style={{ fontSize: 14, marginBottom: 200 }}>Welcome back.</Text>

      <PhoneNumberInput
        label="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

    {/* Needs to be changed to sign-in-button */}
      <RegisterButton title = "Sign In" onPress={handlePress} />
      <Text style={{ fontSize: 14, marginTop: 10}}>Don't have an account? Register.</Text>

      </View>
    </>
  );
};
  export default ExistingUserScreen;
