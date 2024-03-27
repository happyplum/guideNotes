---
sidebar: auto
---

# 关于 Vue-Cli 迁移到 Vite

本文用于笔记把项目从 vue-cli 迁移到 vite 环境所需的大致步骤和具体区别
PS:有部分步骤为*历史脚手架*修改,可忽略

## STEP 1 修改基本配置文件

### package.json

-   scripts
    将 **dev** 或 **serve** 替换为 `vite --open`
    将 **build** 替换为 `vite build`
-   **dependencies**
    删除原有的 `@vue/cli` 相关组件,新增 `yarn add vite vue-tsc @vitejs/plugin-vue vite-plugin-style-import consola`

    **vite** 为 vite 运行用环境<br/>
    **@vitejs/plugin-vue** 为 vite 解析 vue 组件用<br/>
    **vue-tsc** 为解析 typeScript 用<br/>
    **vite-plugin-style-import** 为模块加载,自动加载样式用组件,consola 为该组件必要<br/>

### tsconfig.json

-   **compilerOptions** 新增`"isolatedModules": true`
-   **types** 新增`"vite/client"`

### vite.config.ts

基础模板如下

```ts
export default defineConfig({
	base: publicPath, // 打包后的路径设置 —— 可自定义路径
	server: {
		hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
		port: 8080, //端口号，默认3000
		open: false, //类型： boolean | string 启动时自动打开浏览器
		https: false, //是否开启https
		cors: false, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
		host: "0.0.0.0", //指定服务器应该监听哪个 IP 地址
		proxy: {},
	},
	resolve: {
		// 定义别名
		alias: {
			"@": resolve(__dirname, "src/"),
		},
	},
	build: {
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: [],
			// https://rollupjs.org/guide/en/#big-list-of-options
			//打包时文件分模块输出
			output: {
				chunkFileNames: "static/js/[name]-[hash].js",
				entryFileNames: "static/js/[name]-[hash].js",
				assetFileNames: "static/[ext]/[name]-[hash].[ext]",
				// globals: {
				// 	vue: 'Vue',
				// },
			},
		},
		watch: {
			// https://rollupjs.org/guide/en/#watch-options
		},
		// Turning off brotliSize display can slightly reduce packaging time
		brotliSize: false,
		chunkSizeWarningLimit: 2000,
	},
	plugins: [
		//vue插件默认
		vue(),
	],
	css: {
		preprocessorOptions: {
			scss: {
				//定义公共的scss变量文件,实际是在每个scss头部添加引入
				additionalData: `@import "./src/css/vars.scss";`,
			},
		},
	},
});
```

1. `const { defineConfig } = require('@vue/cli-service')`替换为`import { defineConfig } from 'vite'`
2. 添加`import vue from '@vitejs/plugin-vue'`
3. 修改**config**公共配置<br/>
   复制`publicPath`到`base` //用于修改自定义路径<br/>
   复制`devServer/proxy`到`server/proxy`,其中 **pathRewrite** 对像,需要修改为 **rewrite** 方法:`rewrite: (path) => path.replace(/^\/test/, '/test')`将访问路径进行正则替换<br/>
4. 替换别名
   将原有 **chainWebpack** 中的 **config.resolve.alias.set** 中的内容,复制到 **resolve.alias** 下,如果是文件夹,需要补充路径斜杠,如`config.resolve.alias.set('@', path.resolve('src'))`->`'@': resolve(__dirname, 'src/'),`
5. 修改完毕后删除原有的 vue.config.js

### d.ts

需要新增以下 2 个 d.ts 声明文件<br/>

1. **env.d.ts**

```ts
/// <reference types="vite/client" />

declare module "*.vue" {
	import type { DefineComponent } from "vue";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
```

2. **shims.d.ts**

```ts
import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

declare module "@vue/runtime-core" {
	// Declare your own store states.
	interface State {
		count: number;
	}

	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}

declare module "*.vue" {
	import type { DefineComponent } from "vue";
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
```

### 针对模块按需加载

vueCli 时的方案可能是使用 **babelPlugins** 实现,如 **babel-plugin-import**
vite 提供了 2 种按需加载方式,还有种自动导入方式

1. **unplugin-auto-import** 该组件为官方推荐使用,但是支持范围较少

```ts
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "./src/libs/ant-design-vue/resolver";
import { VxeTableResolver } from "./src/libs/vxe-table/resolver";
export default defineConfig({
	plugins: [
		Components({
			resolvers: [VxeTableResolver(), AntDesignVueResolver()],
			dts: "src/typings/components.d.ts",
		}),
	],
});
```

2. **vite-plugin-style-import** 该组件实际是加载组件时自动加上样式路径

```ts
import { AntDesignVueLib } from "./src/libs/ant-design-vue/resolver";
import { VxeTableLib } from "./src/libs/vxe-table/resolver";
import {
	AndDesignVueResolve,
	createStyleImportPlugin,
	VxeTableResolve,
} from "vite-plugin-style-import";
export default defineConfig({
	plugins: [
		//antdv配置以及VxeTable配置插件
		createStyleImportPlugin({
			resolves: [AndDesignVueResolve(), VxeTableResolve()],
			libs: [AntDesignVueLib(), VxeTableLib()],
		}),
	],
});
```

3. **AutoImport**,这个实际上算是个自动导入方案,非常规按需加载

```ts
import AutoImport from "unplugin-auto-import/vite";
export default defineConfig({
	plugins: [
		AutoImport({
			imports: ["vue", "vue-router", "vue-i18n", "vuex"],
			dts: "src/typings/auto-imports.d.ts",
		}),
	],
});
```

## STEP 2 修改 VUE 变量

因为修改为 VITE 环境,原先 VUE 变量现在不会进行加载,根据文档,需要全局将 **VUE\_**替换为**VITE\_**

1. **.env**

    `VUE_APP_I18N_LOCALE = zh-cn`->`VITE_APP_I18N_LOCALE = zh-cn`

## STEP 3 process 替换 import.meta

需要将 vite 加载的文件种 process 对像替换为 import.meta

原先 **node** 读取的部分不需要进行变动,一般只需要修改 **src** 目录下的文件和子文件即可,具体请查看入口文件和相应文件关系
同样,在 **node 前置环境**(如 vite.config.ts)中定义的如 **process.env** 变量也会继承到 **import.meta.env** 中

例如 `process.env.VITE_APP_NAME`->`import.meta.env.VITE_APP_NAME`

## STEP 4 require 替换 import

由于 vite 使用的是 web 特性,在脱离了 **node 前置环境**后,都是使用浏览器环境运行,因此无法使用 require 函数加载文件,需要将原先 require 方法修改为 import

1. 加载前引入

```ts
const name = require("../package.json").name;
```

修改为

```ts
import packageJSON from "../package.json";
const name = packageJSON.name;
() => {};
```

2. 异步引入

```ts
() => {
	const packageJSON = require("../package.json");
}();
```

```ts
async () => {
	const packageJSON = await import("../package.json");
	const name = packageJSON.name;
}();
```

3. require.context 引入

```ts
require.context("./locales", true, /[A-Za-z0-9-_,\s]+\.json$/i);
```

```ts
import.meta.globEager("./locales/*.json");
```

此方法的修改需要注意,**require.context**返回的是一个**方法**,需要使用**keys**进行迭代,import.meta.globEager 返回的是个对像

## STEP 5 关于 JS 的 import 补充

    使用vite后,进行import引入不会自动识别后缀名.因此在非引入文件夹的情况下,需要进行精确到文件名后缀

```ts
// import LeftMenu from "./LeftMenu"; // error
import LeftMenu from "./LeftMenu.vue";
export default LeftMenu;
```

## STEP 6 关于 CSS 的 import 补充

    使用vite后,使用url加载别名不需要使用~号标注解析

```css
@font-face {
	font-family: "element-icons";
	/* src: url('~@/assets/fonts/element-icons.ttf'); webpack */
	src: url("@/assets/fonts/element-icons.ttf");
}
```
