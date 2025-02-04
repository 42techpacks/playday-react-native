/* This is the authentication screen for a brand new user. They must input their username and
phone number in order to create an account. There is also an option to redirect to the sign in page.
*/

import { View, Text, Alert } from "react-native";
import RegisterButton from "../components/register-button";
import UsernameInput from "../components/username-input";
import PhoneNumberInput from "../components/phone-number-input"
import { Authenticated } from "convex/react";
import { Redirect } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Button } from 'react-native';

const NewUserScreen: React.FC = () => {
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
      <Authenticated>
        <Redirect href="/" />
      </Authenticated>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 24, marginBottom: 10 }}>finyl</Text>
        <Text style={{ fontSize: 14, marginBottom: 200 }}>Start curating your sound today.</Text>
      <UsernameInput
          label=""
          placeholder="Username"
          value={text} 
          onChangeText={setText} 
      />
      <PhoneNumberInput
        label="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <RegisterButton title = "Register" onPress={handlePress} />
      <Text style={{ fontSize: 14, marginTop: 10}}>Already have an account? Sign in.</Text>

      </View>
    </>
  );
};
export default NewUserScreen;
