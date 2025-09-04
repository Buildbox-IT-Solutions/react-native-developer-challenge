const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders: [],
  resolver: {
    blockList: [
      /.*\\AppData\\Local\\Temp\\.*/,
      /.*\\AppData\\Local\\Docker\\.*/,
      /.*\\node_modules\\.*\\.sock$/,
      /.*\\AppData\\Local\\Docker\\run\\.*/,
      /.*\\.sock$/,
    ],
  },
  watcher: {
    additionalExts: ['ts', 'tsx'],
    watchman: {
      deferStates: ['hg.update'],
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
