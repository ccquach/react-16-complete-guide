// default module that comes with node (no need to install dependency)
const path = require('path');

const autoprefixer = require('autoprefixer');

module.exports = {
  devTool: 'cheap-module-eval-source-map',
  entry: './src/index.js',
  output: {
    /* 
    Generate absolute path, appending destination folder name 
    to full path of current folder on local machine. 
    If destination folder does not exist, it will be created.
    */
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '',
  },
  /*
  Allows exclusion of .js extension from import statements
  */
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  /*
  Rules for transforming files
  */
  module: {
    rules: [
      /*
      Presets: env, react (JSX)
      Transpile next-gen JS to current-gen JS run on browsers
      */
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      /*
      css-loader: how to handle .css imports
      style-loader: injects CSS code to HTML head, reducing amount of file downloads
      postcss-loader: autoprefixer
      */
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            /*
            Options set to enable css-modules
              name: class name specified in CSS file
              local: module name
              hash: unique key
            */
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({
                  browsers: ['> 1%', 'last 2 versions'],
                }),
              ],
            },
          },
        ],
      },
    ],
  },
};
