# HTTP状态码

### 定义
* HTTP状态码表示网页服务器HTTP响应状态的3位数字代码。
* 所有状态码的第一个数字代表了响应的五种状态之一。

### 消息 1xx
* 100 Continue 接受初始请求
* 101 Switching Protocols 遵从客户的请求转换协议

### 成功 2xx
* 200 OK 一切正常
* 201 Created 服务器已经创建了文档
* 202 Accepted 已经接受请求，尚未完成处理
* 204 No Content 没有新文档
* 206 Partial Content 成功处理了部分GET请求

### 重定向 3xx
* 300 Multiple Choice 请求的文档可以在多个位置找到
* 304 Not Modified 使用缓存文档

### 请求错误 4xx
* 400 Bad Request 请求出现语法错误
* 401 Unauthorized 未经授权访问受密码保护的页面，需要WWW-Authenticate头
* 403 Forbidden 拒绝请求
* 404 Not Found 服务器上无法找到指定资源
* 405 Method Not Allowed 请求方法不适用
* 408 Request Timeout 请求超时

### 服务器错误 5xx
* 500 Internal Server Error 服务器内部错误
* 502 Bad Gateway 服务器作为网关或代理时，从上游服务器接收到无效的响应。