---
sidebar: auto
---

# Conda

Conda 是一个跨平台、与编程语言无关的二进制包管理器。Miniforge 和 Anaconda 等工具包都包含有 conda 发行版。Conda 将环境视为一等公民，可以轻松创建独立的运行环境。conda 命令行界面完全用 Python 编写，并以 BSD 许可开源。

:::tip
conda 可以理解为一个工具，也是一个可执行命令，其核心功能是包管理和环境管理。包管理与 pip 的使用方法类似，环境管理则是允许用户方便滴安装不同版本的 python 环境并在不同环境之间快速地切换。
:::

要引导启动最小发行版，请使用最小安装程序，例如 Miniconda 或 Miniforge。

## 安装 Conda

如果没有完整的 python 安装环境，可以直接安装 Anaconda 完整包即可包含 Conda
本次以 Miniconda 为基准安装，包含 python 和最小安装包

### powershell

```powershell
Invoke-WebRequest -Uri "https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe" -outfile ".\Downloads\Miniconda3-latest-Windows-x86_64.exe"
```

会下载安装包到指定路径，比如上面的指令就是下载到相对路径的 Downloads 下

## 更新 Conda

要更新 conda 到最新版本，请使用以下命令：

```bash
conda update --name base conda
#or
conda install --name base conda=22.11.1 #版本跨度过大，无法直接升级的时候请先安装过渡版本
```

## 使用 Conda

windows 下没办法直接使用 Conda，需要使用安装后生成的专用命令工具 `Anaconda Prompt.exe` 进行使用

### 常用命令

```bash
conda list #查看已安装
conda search #查看可安装
conda install #<package-name> #安装指定包
```

### 生成虚拟环境

这是我使用该套件的主要目的，使用 conda 可以搭建一个干净的虚拟环境

创建环境

```bash
conda create --name ml-project pytorch #创建环境ml-project，预安装pytorch
conda activate ml-project #进入环境
conda deactivate #推出环境
```

`conda create --name <环境名> <需要的 python 安装包列表>`
