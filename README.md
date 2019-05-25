自己学习react的demo

使用插件包括：

    redux，

    react-redux，

    redux-thunk, //处理redux异步

    react-router-dom,

    babel-plugin-transform-decorators-legacy，//装饰器优化redux的connect//配置时Babel >= 7.x（"plugins": [["@babel/plugin-proposal-decorators", { "legacy": true }],]）

    antd-mobile,

    babel-plugin-import,

    browser-cookies,

    axios,

    socket.io-client

服务端使用的是nodeJS加mongodb，依赖的插件有:

    express,

    cookie-parser,

    mongoose,

    nodemon, // 用于server的热启动

    socket.io,



前后端调试在package.json中添加"proxy": "http:localhost:9093"