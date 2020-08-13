/**
 * SharedWorker实现订阅发布者
 */
const portInfoList = []

self.onconnect = function(e) {
    const selfPort = e.ports[0]
    ensurePorts(selfPort)

    console.log(e, 'onconnect e')

    selfPort.onmessage = function(e) {
        // 初始化
        if (e.data && e.data.type === 'init') {
            const portInfo = portInfoList.find(portInfo => portInfo.port === selfPort)

            // 外部参数(通常用于确定是属于哪个页面的port)
            if (portInfo) portInfo.options = e.data.options
        } else {
            dispatch(selfPort, e.data)
        }
    }
}

// 订阅
function ensurePorts(port) {
    if (portInfoList.indexOf(port) < 0) {
        portInfoList.push({ port })
    }
}

// 发布
function dispatch(selfPort, data) {
    // 发布到指定页面
    if (data && data.pathname) {
        const portInfo = portInfoList.find(portInfo => portInfo.options && portInfo.options.pathname === data.pathname)
        if (portInfo) portInfo.port.postMessage(data)
    } else {
        // 发布到除自身外的其他所有页面
        portInfoList
            .filter(portInfo => selfPort !== portInfo.port)
            .forEach(portInfo => portInfo.port.postMessage(data))
    }
}

setTimeout(() => {
    console.log(portInfoList, 'portInfoList')
}, 6000)
