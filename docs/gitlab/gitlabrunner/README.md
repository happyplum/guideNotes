---
sidebar: auto
---

# gitlab-Runner

本工具主要用于支撑 gitlab ci,用于运行 ci 流水线

## 关于安装

### 安装包

可以使用官方打包好的安装包安装[下载地址](https://gitlab-runner-downloads.s3.amazonaws.com/latest/index.html)

### 官方仓库

也可以使用官方仓库安装

    对于 Debian/Ubuntu/Mint：

```bash
curl -L "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh" | sudo bash
sudo apt install gitlab-runner
```

    对于 RHEL/CentOS/Fedora：

```bash
curl -L "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.rpm.sh" | sudo bash
dnf install gitlab-runner
```

    相对起来官方仓库支持update,更新较为方便

## 关于注册

很简单,使用命令`gitlab-runner register`即可,token 和 url 请参考自己的 **gitlab 服务器**

```bash
gitlab-runner register
```

具体关于 runner 之间的差别,请查阅[官方文档](https://docs.gitlab.com/runner/register/)

注册完毕后会在默认路径`/etc/gitlab-runner/`生成配置文件`config.toml`

:::tip
默认的 runner 只能跑一个实例,可以从 config.toml 中修改 concurrent
默认的 docker 镜像建议自行编译
帐号密码建议使用 setting-CI/CD-变量进行配置
:::

## 关于.gitlab-ci.yml

自动编译要用到的配置文件,详情[官方介绍](https://docs.gitlab.com/ee/ci/yaml/index.html)
关于到系统的[自带变量](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html)
也可以访问自己搭建的 gitlab 服务器,help 页面,如`http://10.100.23.60/help/ci/yaml/index`查看

我自己的样例

```yml
stages:
    - install
    - build
    - deploy

image: happyplum/node:16.14.2

install-job:
    stage: install
    tags:
        - joyware
    cache:
        key: "${CI_PROJECT_PATH_SLUG}_${CI_COMMIT_REF_SLUG}"
        paths:
            - node_modules/
            - .yarn/
            - yarn.lock
    script:
        - echo "${WEB_COMMUNITYWEB_NAME}_${CI_COMMIT_REF_SLUG}"
        - npm config set registry http://10.100.23.60:10010/
        - yarn install

build-job:
    stage: build
    tags:
        - joyware
    script:
        - yarn install
        - yarn run build
    cache:
        key: "${CI_PROJECT_PATH_SLUG}-${CI_COMMIT_REF_SLUG}"
        paths:
            - dist
    artifacts:
        paths:
            - dist

deploy-job:
    stage: deploy
    tags:
        - joyware
    before_script:
        - mkdir -p ~/.ssh
        - chmod 700 ~/.ssh
        - echo "${WEB_DEV_SERVER}" > ~/.ssh/known_hosts
        - chmod 644 ~/.ssh/known_hosts
        - '[[ -f /.dockerenv ]] && echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config'
    script:
        - sshpass -p ${SERVER_198_PASSWORD} scp -r ./dist ${SERVER_198_USERNAME}@${WEB_DEV_SERVER}:/home/vcloud/web/${WEB_COMMUNITYWEB_NAME}_${CI_COMMIT_REF_SLUG}
```

分为三个阶段,然后`build`阶段输出`dist`文件夹
`deploy`阶段其中`before_script`其实有些配置是无效的,但是为了能稳定使用 scp 先加上了
