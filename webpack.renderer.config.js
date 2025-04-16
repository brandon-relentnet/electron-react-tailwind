const rules = require('./webpack.rules');

rules.push({
  test: /\.css$/,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' },
    { loader: 'postcss-loader' } // <== add this
  ]
})

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
};
