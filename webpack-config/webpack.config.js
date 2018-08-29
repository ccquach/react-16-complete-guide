// default module that comes with node (no need to install dependency)
const path = require('path');

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
};
