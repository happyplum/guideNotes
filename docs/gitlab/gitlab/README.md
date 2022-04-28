---
sidebar: auto
---

# gitlab

::: tip
gitlab 的[官方安装](https://about.gitlab.com/install/)地址
我使用的系统为 debian+docker+gitlab-EE
:::

## Debian

### 安装(install)

::: tip
在官方一般是显示 **gitlab-EE** 版本,中国用户可能是显示**极狐**版本,建议可以根据官方文档搭建完环境,然后在[官方仓库](https://packages.gitlab.com/gitlab)挑选版本,可以根据 Distro/version 挑选合适的安装包,点击安装包后右上角也会显示如何添加/修改仓库,来使用系统自带的管理工具安装
:::

1. 首先安装下必要环境

```
sudo apt update
sudo apt install -y curl openssh-server ca-certificates perl postfix
```

2. 添加仓库,可以使用官方示例的 ee 脚本,也可以在 tip 指引的[官方仓库]中寻找

```
curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.deb.sh | sudo bash
```

3. 使用自带管理工具安装,安装前可设置 EXTERNAL_URL 变量提前指定域名,也可以在稍后通过 rb 文件修改

::: tip
如果你没有域名的话,请使用 http 协议+ip 地址,如 EXTERNAL_URL="http://192.168.1.1"
:::

```
sudo apt update
sudo EXTERNAL_URL="https://your.domain" apt install gitlab-ee
```

4. 登录
   安装完毕后非指定的情况下会生成随机密码,路径在`/etc/gitlab/initial_root_password`,使用 root 用户即可登录 gitlab 了

::: warning
密码文件会在 24 小时后的下次运行/重启后删除,请注意**记录**或者及时修改你的**root**密码
:::

## docker

### 安装

::: tip
docker 提供了多种安装方式,具体可以参照[官方说明](https://docs.gitlab.com/ee/install/docker.html)
本次就介绍下**Docker Compose**的配置文件
:::
docker 的安装请参考[官方文档](https://docs.docker.com/get-docker/)
docker componse v2 的[安装文档](https://docs.docker.com/compose/cli-command/#installing-compose-v2)

::: tip
docker componse 建议直接使用 v2 版本,体验比 v1 版本好不少,docker-componse 命令可以使用 Compose Switch 来添加自定义命令来保证命令的兼容性
:::

### docker-compose.yml

参考配置

```yml
services:
    web:
        image: "gitlab/gitlab-ee:latest"
        container_name: "gitlab"
        restart: always
        hostname: "your.domian"
        environment:
            GITLAB_OMNIBUS_CONFIG: | #gitlab.rb的自定义配置,可以参照下面的gitlab.rb
                # Add any other gitlab.rb configuration here, each on its own line
                # gitlab Configre
                external_url 'https://your.domian:xxxx' #使用非80,443的端口可以在国内避免备案
        ports:
            - "xxxx:xxxx"
            - "xxxx2:22"
        volumes:
            - "/srv/gitlab/config:/etc/gitlab"
            - "/srv/gitlab/logs:/var/log/gitlab"
            - "/srv/gitlab/data:/var/opt/gitlab"
```

### 运行

v1 命令
`docker-compose up -d`

v2 命令
`docker compose up -d`

### 更新

1. 拉取新的 image
   `docker-compose pull`
2. 关闭原有的 docker 任务
   `docker-compose down`
3. 重新启动 docker 任务,请勿使用 reset
   `docker-compose up-d`

::: warning
docker 版本的更新请注意**版本号**,在**大版本**更新时需要按照`指定版本号`的步骤进行升级
:::

## gitlab.rb

gitlab 主要的配置文件

一般建议添加的配置如下

```rb
    # Add any other gitlab.rb configuration here, each on its own line
    # gitlab Configre
    external_url 'https://your.domian:xxxx' #使用非80,443的端口可以在国内避免备案
    gitlab_rails['gitlab_shell_ssh_port'] = xxxx2  #ssl端口,主要影响页面生成的配置文件,实际应用主要还是靠下方的映射
    nginx['listen_port'] = xxxx #监听nginx端口
    nginx['redirect_http_to_https'] = true  #是否开启http强制跳转
    nginx['ssl_certificate'] = "/etc/gitlab/cert/cert.pem"  #ssl证书
    nginx['ssl_certificate_key'] = "/etc/gitlab/cert/privkey.pem"  #ssl证书
    letsencrypt['enable'] = false #自动证书,自动证书请看自身情况,我有其他服务器提供域名证书,不需要进行自签
    gitlab_rails['registry_enabled'] = false  #校验
    gitlab_rails['backup_archive_permissions'] = 0644 #生成的备份文件权限
    gitlab_rails['backup_keep_time'] = 7776000 #备份保留天数，秒计算
    # email,请自行配置
    gitlab_rails['gitlab_email_from'] = 'xxxx@mail.com'
    gitlab_rails['smtp_enable'] = true
    gitlab_rails['smtp_address'] = "smtp.mail.com"
    gitlab_rails['smtp_port'] = 25
    gitlab_rails['smtp_user_name'] = "xxxx@qq.com"
    gitlab_rails['smtp_password'] = "pwd"
    gitlab_rails['smtp_domain'] = "mail.com"
    gitlab_rails['smtp_authentication'] = "login"
```

## 备份/还原

### 全局情况

1. 确定 rsync 已安装

```bash
# Debian/Ubuntu
sudo apt-get install rsync

# RHEL/CentOS
sudo yum install rsync
```

2. 备份

::: warning
GitLab 不备份任何配置文件(/etc/gitlab)、TLS 密钥和证书或系统文件。强烈建议您阅读有关[存储配置](https://docs.gitlab.com/ee/raketasks/backup_restore.html#storing-configuration-files)文件的信息。
:::

配置文件大致

-   /etc/gitlab/gitlab-secrets.json
-   /etc/gitlab/gitlab.rb
-   pem 证书

    备份命令如下

```bash
sudo gitlab-backup create
```

备份的默认路径为`/var/opt/gitlab/backups`,文件名为`${时间}_${版本}_gitlab_backup.tar`

3. 还原/迁移

:::tip
先将备份的配置文件还原到相应位置,并确认版本相同
确保 tar 文件在**backups**(默认`/var/opt/gitlab/backups`)中
:::

还原命令

```bash
gitlab-backup restore BACKUP=11493107454_2018_04_25_10.6.4-ce
```

BACKUP=部分为文件`_gitlab_backup.tar` 前部分

### docker

备份命令

```bash
docker exec -t <container name> gitlab-backup create
```

备份文件在`{docker}/data/backups/`中

恢复命令

::: tip
其实命令和原生没什么区别,也可以`docker exec -it <name of container> bash` 进入容器内执行
或者直接备份好映射的`data`,`config`,`logs`即可
:::

```bash
# Stop the processes that are connected to the database
docker exec -it <name of container> gitlab-ctl stop puma
docker exec -it <name of container> gitlab-ctl stop sidekiq
# Verify that the processes are all down before continuing
docker exec -it <name of container> gitlab-ctl status
# Run the restore. NOTE: "_gitlab_backup.tar" is omitted from the name
docker exec -it <name of container> gitlab-backup restore BACKUP=11493107454_2018_04_25_10.6.4-ce
# Restart the GitLab container
docker restart <name of container>
# Check GitLab
docker exec -it <name of container> gitlab-rake gitlab:check SANITIZE=true
```
