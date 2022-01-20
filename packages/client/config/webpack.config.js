const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              '@babel/preset-react',
              '@emotion/babel-preset-css-prop'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-transform-runtime',
              ['@babel/plugin-transform-typescript', { allowNamespaces: true }],
              ['@babel/plugin-proposal-optional-chaining', {
                loose: true
              }],
            ]
          }
        }
      },
      {
        test: /\.(ttf|eot|svg|gif|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        }]
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '~': path.resolve(__dirname, '../src'),
    },    
  },  
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  devServer: {
    allowedHosts: 'all',
    historyApiFallback: true,
    port: 3000,    
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
        base: '/',
    })
  ]
};