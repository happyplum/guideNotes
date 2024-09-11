# TrueNas Scale

## jlmkr

创建监狱 jlmkr create JAILNAME

开始监狱 jlmkr start JAILNAME

停止监狱 jlmkr stop JAILNAME

检查监狱状态 jlmkr status JAILNAME

删除监狱并删除其文件（需要确认） jlmkr remove JAILNAME

查看监狱列表（包括正在运行、未运行、发行版、启动状态和 IP） jlmkr list
myjail

查看正在运行的监狱列表 machinectl list

从 TrueNAS shell 在监狱内执行命令 jlmkr exec JAILNAME COMMAND

从 TrueNAS shell 在监狱内执行 bash 命令 jlmkr exec JAILNAME bash -c 'BASHCOMMAND'

切换到监狱的外壳 machinectl shell JAILNAME
machinectl shell myjail

查看监狱的日志 jlmkr log JAILNAME

编辑监狱的配置 jlmkr edit JAILNAME

### 说明

使用`jlmkr list`查看正在运行的 jail,比如`myjail`
使用`machinectl shell myjail`进入'myjail''
切换到监狱之后先安装组件
sudo apt update
sudo apt install nano wget curl git
然后就可以正常运行 debian 命令安装 docker
apt install curl && cd /tmp && curl -fsSL https://get.docker.com -o get-docker.sh && sudo sh get-docker.sh && cd ~ && docker

### 链接

https://github.com/Jip-Hop/jailmaker/blob/main/docs

### 关于挂载目录

--bind 添加到 systemd_nspawn_default_args= 最后即可

PS
按照道理 systemd_nspawn_user_args 和 systemd_nspawn_default_args 相同，但是 systemd_nspawn_default_args 比较有效

### 例子

--bind='/homePath:/jailPath'

### 备注

--bind='/mnt/data/docker/:/jail/docker' --bind='/mnt/data/vcloud/:/home/vcloud'

### 关于权限问题，会碰到 Permission denied (you must be root)

添加 systemd_nspawn_default_args 部分--capability=all

### error setting interface IPv6 to <nil>

docker 大于 26.0.2 的版本会尝试设置 ipv6，但是 trueNas 并不能设置 net，请安装 26.0.1 版本的 docker
27 版本可以直接创建启用 v6 的网络，启用 v6 可能就不会去尝试禁用 v6 导致出错了
···But, it's easier to create a docker network with IPv6 enabled, so that it doesn't need to be disabled on IPv4- only interfaces. It's now just --ipv6 in the network create command, or enable_ipv6: true in compose.

```bash
apt-get install docker-ce=5:26.0.1-1~debian.12~bookworm docker-ce-cli=5:26.0.1-1~debian.12~bookworm
```
