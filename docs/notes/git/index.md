---
sidebar: auto
---

# GIT 笔记

## 怎么使用vscode编辑git info

```bash
git config --global core.editor "code --wait"
```

## 一些必要的全局配置

```bash
#全局rebase
git config --global pull.rebase true

#大小写敏感
git config --global core.ignorecase false

#文件检查
git config --global core.fsmonitor false

#CRLF
git config --global core.autocrlf input
```

## Rebase

```bash
# 基本变基
git rebase <目标分支>

# 交互式变基（最常用）
git rebase -i HEAD~n       # 修改最近n个提交
git rebase -i <提交哈希>   # 基于指定提交变基

# 变基操作命令
git rebase --continue      # 解决冲突后继续
git rebase --abort         # 中止变基
git rebase --skip          # 跳过当前提交
```

- 整理本地提交历史
- 保持线性、清晰的提交历史
- 更新功能分支（无合并提交）
- 修改、合并、拆分或删除提交

## 关于历史包拆分

比如我现在有 3 个提交

    提交1 hash axx
    提交2 hash bxx
    提交3 hash cxx

我现在需要拆分提交 2

1. `git rebase -i cxx`
2. 将**提交 2**的操作改为 edit
3. 使用`git reset HEAD~1`使提交回退一个版本,将修改从缓冲区取出
4. 将需要拆分的文件使用`git commit -m xxx`进行分别提交,提交
5. 使用`git rebase --continue`继续变基,等待变基完毕即可
6. 由于 rebase 后 hash 修改,使用`git push -f`提交覆盖云端

## 关于误删除

首先查询所有历史操作，以下命令都可
`git log -g`
`git reflog show`

找到对应的 logHash

`git reset --hard logHash`

## 关于ssh agent代理

## windows-powershell

```powershell
# 检查服务状态
Get-Service ssh-agent

# 设置服务启动类型为自动
Set-Service ssh-agent -StartupType Automatic

# 启动服务
Start-Service ssh-agent

#将私钥添加到ssh-agent
#添加私钥
ssh-add ~/.ssh/id_rsa
#查询添加哪些私钥
ssh-add -l
#删除所有私钥
ssh-add -D
```

### windows

https://blog.csdn.net/jchnlau/article/details/140714151

### WARNING: UNPROTECTED PRIVATE KEY FILE!

https://superuser.com/questions/1296024/windows-ssh-permissions-for-private-key-are-too-open

### 样例

以id_rsa为例

git 使用 windows ssh

```bash
git config --global core.sshCommand "C:/Windows/System32/OpenSSH/ssh.exe"
#全局使用windows ssh，来调起windows自带的ssh anget
```

~/.ssh
右键-属性-安全，确保id_rsa安全只有当前用户一人

```bash
ssh-add ~/.ssh/id_rsa
#输入密码
```

配置~/.ssh/config
使用`git remote get-url origin`可以获取当前git的 用户@服务器
如:git@codeup.aliyun.com
那么配置文件格式如下

```config
Host codeup.aliyun.com
    HostName codeup.aliyun.com
    User git
    ForwardAgent yes
    IdentityFile ~/.ssh/id_rsa
    AddKeysToAgent yes
```
