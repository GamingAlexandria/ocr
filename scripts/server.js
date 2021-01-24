const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const express = require('express');
const path = require('path');
const cors = require('cors');
const webpackConfig = require('./webpack.config.dev');

const compiler = webpack(webpackConfig);
const app = express();

app.use(cors());
app.use('/', express.static(path.resolve(__dirname, '..')));
app.use(middleware(compiler, { publicPath: '/dist', writeToDisk: true }));

var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

module.exports = app.listen(server_port, server_host, () => {
  console.log('Listening on port %d', server_port);
});
