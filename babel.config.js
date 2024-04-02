module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json', '.jsx'],
        alias: {
          '@api': './src/api',
          '@components': './src/components',
          '@contexts': './src/contexts',
          '@screens': './src/screens',
        },
      },
    ],
  ],
};
