---
sidebar: auto
---

# vscode plugin

Prettier
ESLint
Prettier ESLint

# install

考虑npm可能会因为fnm隔离，然后全局安装会出问题，最好还是使用yarn，pnpm来全局安装

```shell
yarn global add prettier eslint prettier-eslint @typescript-eslint/parser typescript vue-eslint-parser
```

当然也支持项目安装，可以不用管这么多

# VSCode Setting

```json
{
    "editor.defaultFormatter": "rvest.vs-code-prettier-eslint", //默认格式化
    "editor.formatOnPaste": false, //是否自动格式化黏贴内容
    "editor.formatOnSave": false, //每次保存自动格式化
    "editor.formatOnType": false, //是否自动格式化输入(粘贴)的内容
    "editor.formatOnSaveMode": "file", //保存时格式化
    "vs-code-prettier-eslint.prettierLast": false
}
```