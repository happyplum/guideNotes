---
sidebar: auto
---

# 关于开发一个自定义工具的配置笔记

## package.json

写笔记时开发的工具为 swaggerconvapi2,目前已发布到 npm,开发目的为较简单的通过 swagger 通过 config 文件配合生成 api.ts,api.d.ts,api.params.d.ts

-   预期牵扯到的功能为,传参,硬盘读写,打包,ts 生成,
-   后期可能考虑使用额外的指令, ts 重写,生成完毕后使用 prettier 格式化
-   打包工具选定为 rollup
-   使用的仓库管理工具为 yarn,version>2
-   使用的编写方式为 esm
-   需要有 bin 文件支持全局安装使用

:::tip
本配置文件包含现在用的,和下版本考虑添加的组件,可以无视
:::

根据需求写的 package.json 如下

```json
{
	"name": "swaggerconvapi2",
	"version": "1.0.6",
	"description": "swaggerConvApi2 工厂化 新增配置项,配置文件 新增模板 独立函数解析封装,非开源项目,请见谅",
	"type": "module",
	"main": "./index.cjs", //引用时调用的入口文件,未配置bin时可安装swaggerconvapi2后npx调用
	"bin": {
		//执行文件,方便全局安装后调用,使用的调用指令为swapi
		"swapi": "./bin/swapi.cjs"
	},
	"files": ["bin", "index.cjs"], //需要npm上传的文件,文件夹
	"scripts": {
		//yarn run时候的执行命令
		"build": "rollup -c",
		"lint": "prettier './src/**/*.{ts,js,d.ts}' -w",
		"lint-dist": "prettier './dist/**/*.{ts,d.ts}' -w"
	},
	"dependencies": {
		"prettier": "^2.6.2", //用于下版本,使用execa来调用prettier格式化方案
		"prettier-standard": "^16.4.1" //prettier基本样式配置
	},
	"devDependencies": {
		"@rollup/plugin-commonjs": "^21.1.0", //用于兼容cjs格式的组件引入
		"@rollup/plugin-json": "^4.1.0", //用于导入json
		"@rollup/plugin-node-resolve": "^13.2.1", //帮助rollup在打包时查找外部模块引入
		"@types/node": "^17.0.25", //node的type声明
		"esbuild": "^0.14.36", //用于下版本,esbuild编译工具
		"execa": "^4.1.0", //用于下版本,执行外部指令格式化
		"fs-extra": "^10.1.0", //用于下版本,替代fs操作的增强库
		"minimist": "^1.2.6", //参数支持
		"rollup": "^2.70.2", //打包工具
		"rollup-plugin-esbuild": "^4.9.1", //用于下版本,用于支持esbuild
		"rollup-plugin-filesize": "^9.1.2", //用于打包完毕后显示文件大小
		"rollup-plugin-terser": "^7.0.2", //目前使用的打包工具
		"typescript": "^4.6.3" //ts支持
	},
	"author": "407852978@qq.com", //邮箱
	"license": "UNLICENSED", //私人
	"packageManager": "yarn@3.2.0", //yarn工具
	"prepublishOnly": "yarn run build" //publish前需要执行的步骤
}
```

## rollup

`rollup -c` 默认会调用当前目录下的 **rollup.config.js**文件

rollup.config.js 如下

```js
import filesize from "rollup-plugin-filesize";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
export default {
	input: "./src/index.js", //入口我呢见
	output: [
		{
			file: "index.cjs", //输出文件
			format: "cjs", //输出格式,为了兼容性方便调用,我们输出cjs格式
		},
	],
	external: ["eslint"], //打包时排除的组件
	plugins: [
		nodeResolve(), //该插件用于载入依赖
		commonjs(), //载入cjs依赖
		json(), //载入json
		terser({
			//打包
			compress: {}, //压缩
			mangle: {
				toplevel: true, //在顶层作用域中压缩清理变量
				eval: true, //允许使用eval
			},
		}),
		filesize(), //显示下生成的输出
	],
};
```

## bin

如果需要全局安装(global),使用指令执行(swapi),则我们需要编写个 bin 文件,node 在安装时会帮我们自动加载到全局

为了兼容性,使用 cjs 编写

bin/swapi.cjs 文件如下

```cjs
#!/usr/bin/env node
"use strict";
(async function main() {
	process.exitCode = await require("../index.cjs");
})().catch((err) => {
	console.error(err);
});
```

## 关于发布

发布的流程十分简单,使用 publish 发布即可,请确认

:::tip
npm 一般会需要二次验证,建议使用 authenticator 等软件绑定下
:::

:::waring
发布需要检查下使用源,请使用 nrm/yrm 等工具检查自己的使用源,确保为 npm[https://registry.npmjs.org/]才能正常的发布到 npm 上
:::
