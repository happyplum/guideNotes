# webpack



## Loader（加载器）

作用：转换文件，让 webpack 能够处理非 JavaScript 文件。

```tip
核心特点：
从右到左、从下到上执行
同步或异步处理文件
一对一转换（一个文件输入，一个文件输出）
```

常见 Loader 示例：

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      // 处理 CSS 文件
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        // 执行顺序：css-loader → style-loader
      },
      // 处理图片
      {
        test: /\.(png|jpg|gif)$/,
        use: ["file-loader"],
      },
      // 转译 TypeScript
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
};
```

## Plugin（插件）

作用：执行更广泛的任务，比如打包优化、资源管理和环境变量注入等。

```tip
核心特点：
基于事件流，在 webpack 构建生命周期的特定时机执行
功能更强大，可以访问 compiler 和 compilation 对象
一对多或多对一操作
```

常见 Plugin 示例：

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  plugins: [
    // 生成 HTML 文件
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    // 提取 CSS 到单独文件
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    // 定义环境变量
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ],
};
```
