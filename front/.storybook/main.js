const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
  ],
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
      '@pages': path.resolve(__dirname, '../src/components/pages'),
      '@svg-icons': path.resolve(__dirname, '../src/components/icons'),
      '@atoms': path.resolve(__dirname, '../src/components/UI/atoms'),
      '@molecules': path.resolve(__dirname, '../src/components/UI/molecules'),
      '@organisms': path.resolve(__dirname, '../src/components/UI/organisms'),
      '@lib': path.resolve(__dirname, '../src/lib'),
      '@theme': path.resolve(__dirname, '../src/theme'),
      '@queries': path.resolve(__dirname, '../src/queries'),
      '@gql-types': path.resolve(__dirname, '../src/types'),
    };
    return config;
  },
};
