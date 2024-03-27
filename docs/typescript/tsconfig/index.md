---
sidebar: auto
---

# tsconfig 笔记

::: tip
本笔记主要记录一些常用字段功能和描述
:::

## compilerOptions

```typescript
"compilerOptions":{
    "target": "ES6",//编译目标
    "module": "ESNext",//编译模式
    "moduleResolution": "Node",//node | classic 指定模块解析策略
    "jsx": "preserve", //jsx的解析方案
    "lib": ["ESNext", "DOM", "WebWorker", "ScriptHost"], //加载的lib
    "allowJs": true,//允许引入js文件
    "importHelpers": true, //导入帮助,用于从tslib中导入一次,而不是每个文件中导入来减少冗余
    "sourceMap":true,
    "removeComments": true,//删除注释
    "skipLibCheck": false,//忽略所有的声明文件（ *.d.ts）的类型检查。
    "esModuleInterop": true,//CJS导入优化
    "allowSyntheticDefaultImports": true,//允许从没有默认导出的模块中默认导入
    "forceConsistentCasingInFileNames": true,//强制区分大小写
    "resolveJsonModule": true,//允许从 .json 中导入
    "isolatedModules": true,//将每个文件作为单独的模块,不适用隔离（isolated）转译的功能
    "noEmit": true,//不生成输出文件。
    "useDefineForClassFields": true, //使用Define取代Class编译
    /*严格检查相关*/
    "strict": true,//严格模式
    "noImplicitAny": true,//禁止any引入
    "noImplicitThis": true,//禁止使用this
    "strictNullChecks": true,//严格检查null,undefined
    "strictFunctionTypes": true,//确保函数返回值
    "alwaysStrict": true,//严格模式解析,并在生成文件头部添加"use strict"
    "noUnusedLocals": true,//不允许存在未使用的变量
    "noUnusedParameters": true,//不允许存在未使用的传参
    "noImplicitReturns":true,//函数要求所有路径都有返回值
    "noFallthroughCasesInSwitch": true,//不允许switch的case语句贯穿
    /*严格检查*/
    "baseUrl": ".", //工作目录
    "paths": {
        "@/*": ["src/*"]
    },
    "types": ["node"],
    "typeRoots":["typings","node_modules/@types"],
    "experimentalDecorators": true,//装饰器实验提案
}
```

## extends

## files

```ts
"files": ["global.d.ts"],
```

## include

```ts
"include": ["packages/**/*.ts","packages/**/*.js","packages/**/*.tsx","packages/**/*.jsx","packages/**/*.vue"],
```

## exclude

```ts
"exclude": ["dist","node_modules"]
```
