# rollup

## 常用插件

```js
import filesize from "rollup-plugin-filesize"; //文件大小
import { terser } from "rollup-plugin-terser"; //压缩混淆
import { nodeResolve } from "@rollup/plugin-node-resolve"; //加载node功能模块
import commonjs from "@rollup/plugin-commonjs"; //commonjs加载
import json from "@rollup/plugin-json"; //json加载
import ts from "rollup-plugin-typescript2"; //ts加载
```

## 关于ts引入

```js
import ts from "rollup-plugin-typescript2"; //ts加载
const extensions = ['.js', '.ts', '.tsx']; //后缀
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getPath = (_path) => path.resolve(__dirname, _path);
const tsPlugin = ts({
  tsconfig: getPath("./tsconfig.json"), // 导入本地ts配置
  extensions,
});
export default {
    ...
    plugins:[
        ...
        plugins
    ],
    ...
}
```

## 关于output输出

```js
const outputMap = [
  {
    file: packageJSON.main, // 通用模块
    format: "umd",
  },
  {
    file: packageJSON.main, // 通用模块
    format: "cjs",
  },
  {
    file: packageJSON.module, // es6模块
    format: "es",
  },
];
```
