---
sidebar: auto
---

# packages 笔记

## 关于版本号
"element-ui": "^2.15.1",
版本号：  2.15.1 对应 x.y.z
z ：表示一些小的bugfix, 更改z的号；(修复补丁-z)（~符号)
y ：表示一些大的版本更改，比如一些API的变化；(次要更新-y)(^符号)
x ：表示一些设计的变动及模块的重构之类的，会升级x版本号；(重大更新-x)

## packages符号记录
~
    2.15.1 => 2.15.x
    2.15.x => 2.15.x
    2.15.0 => 2.15.x
^
    2.15.1 => 2.x.x
    2.15.x => 2.x.x
    2.15.0 => 2.x.x
latest 最新版本
2.15.1 直接精确版本

## 关于npm-check-update的tags
    ┌──────────┬──────────────────────────────────────────────────────────────────────────────────────────────┐
    │ greatest │ Upgrade to the highest version number published, regardless of release date or tag. Includes │
    ├──────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
    │   latest │ Upgrade to whatever the package's "latest" git tag points to. Excludes prereleases unless    │
    │          │ --pre is specified.                                                                          │
    ├──────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
    │    minor │ Upgrade to the highest minor version without bumping the major version.                      │
    ├──────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
    │   newest │ Upgrade to the version with the most recent publish date, even if there are other version    │
    │          │ numbers that are higher. Includes prereleases.                                               │
    ├──────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
    │    patch │ Upgrade to the highest patch version without bumping the minor or major versions.            │
    ├──────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
    │   semver │ Upgrade to the highest version within the semver range specified in your package.json.       │
    ├──────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
    │   @[tag] │ Upgrade to the version published to a specific tag, e.g. 'next' or 'beta'.                   │
    └──────────┴──────────────────────────────────────────────────────────────────────────────────────────────┘