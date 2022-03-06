# WebSocket 教程

之前做的一个项目中前端构建日志的更新是基于 ws 心跳模型实现的长连接，回顾学习一下~

### http 和 ws 的区别

1. http 单向请求，非持久化；ws 是双向通信协议，模拟 socket 实现的持久化协议
2. 都是基于 tcp 实现的，ws 在握手阶段通过 http 建立通道。连接之后才使用 ws 开始通信，两者是有交叉关系的
3. http 中 request 和 response 一一对应，resp 是被动的；ws 中很自由，不一一对应
4. 连接创建后，ws 进行数据交换时，协议控制的数据包头部较小，比 http 节省流量。

### http2 和 ws 的区别

虽然 HTTP/2 也具备服务器推送功能，但 HTTP/2 只能推送静态资源，无法推送指定的信息。

### 相比轮询

**ajax 轮询**需要服务端能够较快响应和处理请求

**long-poll**采取阻塞模型，需要服务器支持并发

### **总结**

WebSocket 连接的过程是：

首先，客户端发起 http 请求，经过 3 次握手后，建立起 TCP 连接；http 请求里存放 WebSocket 支持的版本号等信息，如：Upgrade、Connection、WebSocket-Version 等；

然后，服务器收到客户端的握手请求后，同样采用 HTTP 协议回馈数据；

最后，客户端收到连接成功的消息后，开始借助于 TCP 传输信道进行全双工通信。

[阮一峰的 ws 教程](https://www.ruanyifeng.com/blog/2017/05/websocket.html)

[一文吃透 ws](https://juejin.cn/post/7020964728386093093)

[实战教学](https://juejin.cn/post/6844903544978407431)
