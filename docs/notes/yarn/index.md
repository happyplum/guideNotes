---
sidebar: auto
---

# yarn 笔记

## 关于依赖固化以及依赖版本不一致

在开发中会碰到 packages.json 因为设置了^导致 install 了有兼容性的版本
自己的项目还好管理，但是碰到依赖的项目中的 packages.json 就没办法被管理了

这时候就需要将依赖进行固化，可以从 yarn.lock 文件查看当前的安装版本

## 依赖固化

packages.json 中可以设置 resolutions 属性来进行固化，配置和 dependencies 中类似，直接使用"包:version"

```json
{
  "resolutions": {
    "vue": "3.3.4"
  }
}
```

## 关于自动生成 packageManager

可以通过系统的设置环境变量关闭
`COREPACK_ENABLE_AUTO_PIN=0`
