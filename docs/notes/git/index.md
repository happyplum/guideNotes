---
sidebar: auto
---

# GIT 笔记

## 怎么使用vscode编辑git info

```bash
git config --global core.editor "code --wait"
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
