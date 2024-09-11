# dockerFile

用于快速生成 docker 容器的文件，并且使用 dockerFile 打包分块可以明显提高容器下载速度

# 自用

```
FROM node:slim

# add yrm and pm2
RUN apt-get update && apt-get install -y sshpass openssl ssh git && rm -rf /var/lib/apt/lists/* && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false
RUN npm install -g yrm pm2 && npm cache clean --force

CMD [ "bash" ]
```

比较简单，在 node:slim 的基础上增加 sshpass 和 yrm 工具

```
FROM node:slim

# add yrm & pm2 & git
RUN apt-get update && apt-get install -y sshpass openssl ssh git && rm -rf /var/lib/apt/lists/* && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false
RUN npm install -g yrm pm2 && npm cache clean --force

# install deno
RUN apt-get update && apt-get install -y curl ca-certificates unzip && rm -rf /var/lib/apt/lists/* && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false
RUN set -ex && curl -fsSLO "https://deno.land/install.sh" && /bin/bash install.sh
ENV DENO_INSTALL="/root/.deno"
ENV PATH="$DENO_INSTALL/bin:$PATH"

CMD [ "bash" ]
```

打包 deno 用的镜像
