---
sidebar: auto
---

# 网址

关于版本切换工具,下载地址如下

github[https://github.com/Schniz/fnm]

# 安装

新的 windows 建议使用 choco 进行安装

```windows
choco install fnm
```

```linux
curl -fsSL https://fnm.vercel.app/install | bash
```

# windows 的 powershell 设置

powershell 默认无法读取到 fnm 的变量，需要进行变量文件配置

## 配置文件位置

使用以下命令可以获取到文件位置

```powershell
$PROFILE | Select-Object *
```

## 配置变量

```powershell
fnm env --use-on-cd | Out-String | Invoke-Expression
```
