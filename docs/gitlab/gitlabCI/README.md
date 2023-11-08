---
sidebar: auto
---

有关 runner 的 ci.yml 配置笔记

## 参数

### cache

cache：用来存储项目的 dependencies，以使下次跑 pipline 的时候更快一些
第一次跑 pipline 的时候下载了外部的依赖了（比如说第三方 jar 包），这样下次跑 pipline 时，就不用再从网络上下载了。但是 stage 之间的中间产物的传递应该用 artifacts。

!!!
chache 有全局和某个步骤中，这里只举例步骤中的
!!!

```yaml
cache:
    key: "${CI_PROJECT_PATH_SLUG}_${CI_COMMIT_REF_SLUG}"
    paths:
        - node_modules/
        - .yarn/
        - yarn.lock
    #policy: push #push || pull 表示只拉或者只推，默认开始拉结束推
```

### artifacts

artifacts：用来在 stage 之间传递 stage 生成物
同一个 pipline 里不同的 stage 之间共享生成物的，在不同的 pipline 之间不可用。

!!!
artifacts 只在某个步骤中
!!!

```yaml
artifacts:
    paths:
        - dist
```

### space&&colon

在我的配置里有个修改 yarn 仓库用脚本

```yaml
- echo -e "npmRegistryServer: \"${NPM_REG_SERVER}\"" >> yarnrc.yml
```

可以看到，明显`npmRegistryServer: `被识别为了一个参数，这是由于 yaml 规则所限制，为了避免识别，可以使用

```yaml
'echo -e "npmRegistryServer: \"${NPM_REG_SERVER}\"" >> yarnrc.yml'
```

但是我里面又包含了${NPM_REG_SERVER}自定义参数，一定使用''包裹，内部就不再被识别，这时可以考虑使用`|`或者`>`来解决，如：

```yaml
- |
    echo -e "npmRegistryServer: \"${NPM_REG_SERVER}\"" >> yarnrc.yml
```

```yaml
- >
    echo -e "npmRegistryServer: \"${NPM_REG_SERVER}\"" >> yarnrc.yml
```
