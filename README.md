# SharedWorker
用SharedWorker实现订阅发布者

[mdn官方demo见此处](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)
[网友改造版本见此处](https://github.com/xiangwenhu/page-communication)

以上两种方案的最大问题就是没办法**指定某些页面之间进行通讯**，
比如我在sharedWorker1.html页面中想指定发送信息到sharedWorker3.html, 就需要在以上demo基础上存储port并添加标识。最终实现真正意义上的指哪打哪。

核心功能： 实现同源页面之间的指定通讯

tip: 需要调试SharedWorker请使用 chrome://inspect/#workers 打开调试器
