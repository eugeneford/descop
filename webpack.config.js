path = require("path");

module.exports = {
  entry: "./src/Descop",
  output: {
    filename: "./dist/descop.js",
    libraryTarget: 'umd',
    library: 'Descop',
    auxiliaryComment: "istanbul ignore next"
  },

  module: {
    loaders: [{
      test: /\.es6$/,
      include: [
        path.resolve(__dirname, "src/")
      ],
      loader: 'babel-loader'
    }]
  },

  resolve: {
    extensions: ['', '.js', '.es6']
  }
};
