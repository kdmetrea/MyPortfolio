const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
    optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            parallel: true,
          }),
      ]
    },
    module:{
        rules:[{
            test: /\.js$/,
            exclude:/node_modules/,
            use:{
                loader:"babel-loader"
            }
        },
        {
            test: /\.css$/,
            use: [
              "style-loader",
              "css-loader"
            ]
        }
    ]
  }
}