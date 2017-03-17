const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./config/webpack.config.dev');

const server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  quiet: true,
  stats: { colors: true },
  headers: { "Access-Control-Allow-Origin": "*" }
});

server.listen(8080, () => {
  console.log('Webpack server running at 8080');
});
