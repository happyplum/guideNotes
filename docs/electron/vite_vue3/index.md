# electron 打包 vite+vue3 项目

## 笔记

# package.json

electron 使用 `package.json` 来定位 electron 的入口，在使用 vue 的过程中如果公用一份 `package.json` 可能会引发类似于`type": "module"`冲突之类的问题，建议初期按照多项目模块管理结构将`tsconfig.json`和`package.json`直接分开

# 关于 typescript

因为前端项目已经普及 ts，如果 electron 也想使用 ts 进行开发，也可以配置 ts，但是`electron-builder`的时候需要引用 js 文件
这时候就可以使用 tsc，打包前将 ts 文件进行转换，转换成 js 文件。相对的 `package.json` 中 main 的入口文件也需要修改为打包后的 js 路径

关于生成 .tsbuildinfo 文件，可以关闭 composite 来防止生成

# 关于打包

使用`electron-builder`进行打包即可

# 关于预览

如果你 tsconfig 处理的时候`module`设置为了 commonJS 进行转换
那么预览的时候 electron 是使用 CommonJS 进行加载
如果 package 中设置了`"type": "module"`,请设置文件名为 cjs 或删除 module

如果你 tsconfig 处理的时候`module`设置为了 ES 进行转换
那么打包的时候请注意，nodejs 在使用 module 进行加载的时候`不支持require, exports, module.exports, __filename, __dirname`
请进行处理
