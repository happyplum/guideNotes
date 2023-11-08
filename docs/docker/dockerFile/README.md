# dockerFile

用于快速生成 docker 容器的文件，并且使用 dockerFile 打包分块可以明显提高容器下载速度

# 自用

```
FROM node:18.18.2

CMD ["bash"]

RUN apt-get update && apt-get install -y sshpass openssl ssh && rm -rf /var/lib/apt/lists/\* && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false
RUN npm install -g yrm
```

比较简单，在 node:18.18.2 的基础上增加 sshpass 和 yrm 工具
