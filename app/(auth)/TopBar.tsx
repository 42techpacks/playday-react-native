import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface TopBarProps {
  // Additional props can be defined here if needed
}

const TopBar: React.FC<TopBarProps> = () => {
  return (
    <View style={styles.container}>
      {/* Logo on the very left */}
      <Image
        source={require('./logo.png')} // Replace with your actual logo path
        style={styles.logo}
        resizeMode="contain"
      />
      {/* Static info icon on the very right */}
      <Image
        source={require('./info.png')} // Replace with your actual info icon path
        style={styles.infoIcon}
        resizeMode="contain"
      />
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,  // Doubled from original size
    height: 55,  // Doubled from original size
    marginLeft: 10, // Now flush against the left edge
  },
  infoIcon: {
    width: 25,  // Doubled from original size
    height: 25, // Doubled from original size
    marginRight: 16, // Maintains right spacing
  },
});
