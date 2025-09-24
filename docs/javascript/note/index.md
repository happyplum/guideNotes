# 笔记

关于：

`The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.`

如果服务端设置了"Access-Control-Allow-Origin": "\*"，客户端请求时无需再设置 withCredentials: true
