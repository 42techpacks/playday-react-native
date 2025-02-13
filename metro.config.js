// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// npm v7+ will install ../node_modules/react-native because of peerDependencies.
// To prevent the incompatible react-native bewtween ./node_modules/react-native and ../node_modules/react-native,
// excludes the one from the parent folder when bundling.
config.resolver.blockList = [
  ...Array.from(config.resolver.blockList ?? []),
  new RegExp(
    path.resolve("..", "expo-spotify-sdk", "node_modules", "react-native"),
  ),
];

config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, "./node_modules"),
  path.resolve(__dirname, "../expo-spotify-sdk/node_modules"),
];

config.watchFolders = [path.resolve(__dirname, "..", "expo-spotify-sdk")];

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = config;
