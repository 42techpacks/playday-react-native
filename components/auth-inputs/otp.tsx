import React from 'react';
import { View, TextInput, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');  // Get the screen width

interface OTPInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ label, value, onChangeText }) => {
  const handleChange = (text: string, index: number) => {
    const newValue = value.split('');
    newValue[index] = text;
    onChangeText(newValue.join(''));
  };

  const inputSize = width / 14;  
  const fontSize = width / 24;   
  const margin = width / 40;   

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { width: inputSize, height: inputSize, fontSize: fontSize, marginHorizontal: margin }]}
          value={value[0] || ''}
          onChangeText={(text) => handleChange(text, 0)}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          placeholder="0"
        />
        <TextInput
          style={[styles.input, { width: inputSize, height: inputSize, fontSize: fontSize, marginHorizontal: margin }]}
          value={value[1] || ''}
          onChangeText={(text) => handleChange(text, 1)}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          placeholder="0"
        />
        <TextInput
          style={[styles.input, { width: inputSize, height: inputSize, fontSize: fontSize, marginHorizontal: margin }]}
          value={value[2] || ''}
          onChangeText={(text) => handleChange(text, 2)}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          placeholder="0"
        />
        <Text style={[styles.hyphen, { fontSize: fontSize }]}>-</Text>
        <TextInput
          style={[styles.input, { width: inputSize, height: inputSize, fontSize: fontSize, marginHorizontal: margin }]}
          value={value[3] || ''}
          onChangeText={(text) => handleChange(text, 3)}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          placeholder="0"
        />
        <TextInput
          style={[styles.input, { width: inputSize, height: inputSize, fontSize: fontSize, marginHorizontal: margin }]}
          value={value[4] || ''}
          onChangeText={(text) => handleChange(text, 4)}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          placeholder="0"
        />
        <TextInput
          style={[styles.input, { width: inputSize, height: inputSize, fontSize: fontSize, marginHorizontal: margin }]}
          value={value[5] || ''}
          onChangeText={(text) => handleChange(text, 5)}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          placeholder="0"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  label: {
    fontSize: 14,
    color: '#808080', 
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 0,
    textAlign: 'center',
  },
  hyphen: {
    color: '#333',
    marginHorizontal: 5,
  },
});

export default OTPInput;
