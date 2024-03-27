---
sidebar: auto
---

# fnm 笔记--node 版本切换器

## 下载地址

https://github.com/Schniz/fnm

## windows 说明

安装完毕后 powershell 需要设置 ps 脚本，配置 profile.ps1

关于 profile.ps1 定位

在 powershell 界面输入已下变量进行输出

```powershell
$profile
```

关于其他文件定位的变量,参考官网[https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.4]

- Current User, Current Host - $PROFILE
- Current User, Current Host - $PROFILE.CurrentUserCurrentHost
- Current User, All Hosts - $PROFILE.CurrentUserAllHosts
- All Users, Current Host - $PROFILE.AllUsersCurrentHost
- All Users, All Hosts - $PROFILE.AllUsersAllHosts

:::tip
windows 下如果你安装过 powershell 可能会存在两个版本
一个版本是 windows powershell,另一个可能是 powershellv7 版本，两个版本的
profile 文件是不一样的，所以需要定位一下
:::

## powershell 命令

使用以下命令即可每次打开时候自动使 fnm 生效

```powershell
fnm env --use-on-cd | Out-String | Invoke-Expression
```
