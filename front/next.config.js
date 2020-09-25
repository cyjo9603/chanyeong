const path = require('path');
const Dotenv = require('dotenv-webpack');
const withBundleAnalyzer = require('@next/bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

const nextConfig = {
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  webpack: (config) => {
    const plugins = [...config.plugins, new Dotenv({ silent: true })];

    if (prod) {
      plugins.push(new CompressionPlugin());
    }

    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins,
    };
  },
};

module.exports = process.env.BUNDLE_ANALYZE === 'both' ? withBundleAnalyzer(nextConfig) : nextConfig;
