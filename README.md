# antd-demo
A demo for using Ant Design, Webpack, Babel and React Router.

## Install

```
git clone git@github.com:brickyang/antd-demo.git
cd antd-demo
```

## Usage

```
npm start
```

Visit `localhost:3000` in browser.

## 说明

这个 demo 是为了回答知乎问题 [如何用原生的react,webpack,es6来使用蚂蚁金服的ant design组件库？](https://www.zhihu.com/question/45088537/answer/152124079) 而写。把原回答也贴在这里好了：

**以下是在知乎的回答**

最近刚好开始尝试 Ant Design。之前我用过 Bootstrap、Semantic UI 和 Material Design Lite。和这些库相比 antd 的确是有自己的优势的。

针对题主的问题，我可以分享点自己的经验。

GitHub 的 demo 代码：[antd-demo](https://github.com/brickyang/antd-demo)

这个 demo 是我从实际项目中摘出来的。用了 React Router、Webpack 和 Babel。其中 Webpack 用了 `assets-webpack-plugin` 和 `extract-text-webpack-plugin` 两个插件。

其实在实际项目中还用了 CSSModule 和 postcss，这里为了简化就去掉了。

另外还用了 `webpack-dev-server` 和 `react-hot-loader`，都是开发必不可少的，所以就留着了。

![](https://pic4.zhimg.com/v2-47b5384132978e73140ada66b71d48db_r.png)

这是文件结构：

- `/build`：Webpack 构建的 js 和 css 文件
- `/config`：应用的配置文件，包括 webpack.config 和 webpack.config.dev 的
- `/src`：源代码
- `/src/components`：用于其他页面的 React 组件
- `/src/Dashboard`：应用的 Dashboard 页
- `/src/Login`：应用的 Login 页
- `/src/router`：React Router 实现的路由
- `/src/index.jsx`：前端入口页面
- `/src/server.js`：一个简单的 Node 服务器

## 使用

下载下来之后运行 `npm start` 。在浏览器中访问 `localhost:3000` 即可。

## 运行

```json
"start": "npm run babel-w & npm run dev-webpack & npm run server",
"dev-webpack": "node webpack-dev-server.js",
"server": "NODE_ENV=development nodemon dist/server.js"
```

`npm start` 做了两件事：

1. 启动 `webpack-dev-server`。Webpack 构建出临时文件，并由 `webpack-dev-server` 提供（localhost:8080/build）。通过插件实现了动态加载和文件分离。
2. 启动 Node 服务器，提供访问服务。

## Webpack

```javascript
const path = require('path');
const webpack = require('webpack');
const assetsPlugin = require('assets-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './index.jsx',
  context: path.resolve(__dirname, '../src'),
  output: {
    filename: '[name].[hash].js',
    hashDigestLength: 7,
    path: path.resolve(__dirname, '../build'),
    publicPath:  'localhost:3000/build/'
  },
  resolve: {
    extensions: ['.js', '.jsx', 'css']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
	loader: 'babel-loader',
	exclude: /node_modules/
      },
      {
	test: /\.css$/,
	use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
        include: path.resolve(__dirname, '../node_modules/antd/lib/')
      }
    ]
  },
  plugins: [
    new assetsPlugin({
    filename: 'assets.json',
    path: 'build'
  }),
  new extractTextPlugin({
    filename: '[name].[hash].css',
    ignoreOrder: true
  }),
  new webpack.optimize.UglifyJsPlugin({
    test: /(\.jsx|\.js)$/,
    minimize: true,
  })],
}
```

这是 Webpack 2 的配置文件（和 Webpack 1 有不同）。注意这个是用来构建正式文件的，即 `webpack.config.js`。开发环境中使用的是 `webpack.config.dev.js`。二者大同小异，主要是开发环境增加了 `react-hot-loader`，实现了前端热更新。

## Babel

如果你只关注前端的话，那么 Babel 是使用 `babel-loader` 在 Webpack 构建时起作用的，不需要自己手动转换。如果你同时还关注后端，其实自从 Node 7.6 支持箭头函数之后，主要的 ES2015 语法都源生支持了，除了 `import/export`，不一定非得用 Babel。

如果发现哪里没摘干净或者写错了，欢迎在 issue 指出。