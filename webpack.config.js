const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  mode: 'development',
  entry: './src/math.js',
  output: {
    library: 'math',
    libraryTarget: 'umd',
    filename: 'math.es5.js',
    path: resolve('dist')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader' // 使用 babel-loader 处理 es 代码
        }
      }
    ]
  }
}
