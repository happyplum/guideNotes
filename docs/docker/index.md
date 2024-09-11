# docker

## proxy

现在 docker hub 被墙了，需要设置代理拉取镜像

```bash
mkdir -p /etc/systemd/system/docker.service.d
touch /etc/systemd/system/docker.service.d/http-proxy.conf
```

```conf
[Service]
Environment="HTTP_PROXY=http://10.100.23.129:1081" "HTTPS_PROXY=http://10.100.23.129:1081" "NO_PROXY=localhost,127.0.0.*,10.100.23.*,192.168.*.*"
```

```bash
systemctl daemon-reload
systemctl restart docker
systemctl show --property=Environment docker
```

直接 run 镜像的话会因为没指令，直接出现 exit(0)而直接退出，测试镜像可以使用 docker run 测试

```bash
docker run -d -t -i imageXXX /bin/bash
```

imageXXX 替换成相应的镜像，但不是每个镜像都有用
