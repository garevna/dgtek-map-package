const path = require('path')
const webpack = require('webpack')
// const dotenv = require('dotenv')
//   .config({ path: path.join(__dirname, '.env') })

module.exports = {
  entry: './src/dgtekMap.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'dgtek-map.js',
    library: {
      name: 'dgtek-map',
      type: 'umd'
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  }
  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env': dotenv.parsed
  //   })
  // ]
}
