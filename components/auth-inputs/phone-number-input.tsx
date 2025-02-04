import React from 'react';
import { View, TextInput, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface PhoneNumberInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ label, value, onChangeText }) => {
  const handleChange = (text: string, index: number) => {
    const newValue = value.split('');
    newValue[index] = text;
    onChangeText(newValue.join(''));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value[0] || ''}
          onChangeText={(text) => handleChange(text, 0)}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          placeholder="0"
        />
        <TextInput
          style={styles.input}
          value={value[1] || ''}
          onChangeText={(text) => handleChange(text, 1)}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          placeholder="0"
        />
        <TextInput
          style={styles.input}
          value={value[2] || ''}
          onChangeText={(text) => handleChange(text, 2)}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          placeholder="0"
        />
        <Text style={styles.hyphen}>-</Text>
        <TextInput
          style={styles.input}
          value={value[3] || ''}
          onChangeText={(text) => handleChange(text, 3)}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          placeholder="0"
        />
        <TextInput
          style={styles.input}
          value={value[4] || ''}
          onChangeText={(text) => handleChange(text, 4)}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          placeholder="0"
        />
        <TextInput
          style={styles.input}
          value={value[5] || ''}
          onChangeText={(text) => handleChange(text, 5)}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          placeholder="0"
        />
        <Text style={styles.hyphen}>-</Text>
        <TextInput
          style={styles.input}
          value={value[6] || ''}
          onChangeText={(text) => handleChange(text, 6)}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          placeholder="0"
        />
        <TextInput
          style={styles.input}
          value={value[7] || ''}
          onChangeText={(text) => handleChange(text, 7)}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          placeholder="0"
        />
        <TextInput
          style={styles.input}
          value={value[8] || ''}
          onChangeText={(text) => handleChange(text, 8)}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          placeholder="0"
        />
        <TextInput
          style={styles.input}
          value={value[9] || ''}
          onChangeText={(text) => handleChange(text, 9)}
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
    fontSize: 8,
    color: '#808080',
    marginBottom: 8,
  },
  inputContainer: {
   
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 20,
    height: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 4,
  },
  hyphen: {
    fontSize: 24,
    color: '#333',
    marginHorizontal: 4,
  },
});

export default PhoneNumberInput;
