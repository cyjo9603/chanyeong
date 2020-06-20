const Dotenv = require('dotenv-webpack');

const withLess = require('@zeit/next-less');

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  webpack: (config) => {
    config.plugins.push(new Dotenv({ silent: true }));
    return config;
  },
});
