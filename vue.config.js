module.exports = {
  publicPath: "/",
  chainWebpack: config => {
    config.plugins.delete("fork-ts-checker"); // 禁用fork-ts-checker
  },
  devServer: {
    publicPath: '/',
    port: 10000, // 端口号
    // 如果外网想ip访问 屏蔽掉host
    // host: 'localhost',
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    // proxy: 'http://localhost:3000' // 配置跨域处理,只有一个代理
    proxy: {
        'sysApi/': {
            target: 'http://localhost:10002',
            //target: 'http://47.97.200.76/sysApi',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/sysApi': '' // 通过pathRewrite重写地址，将前缀/api转为/
            }
        }
    } // 配置多个代理
},
assetsDir: 'static'
};


