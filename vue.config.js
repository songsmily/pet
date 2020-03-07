module.exports = {
    devServer:{
        proxy:{
            '/api':{
                target:"http://127.0.0.1:8099/",
                // target:"http://123.57.55.176:8099/",
                port: 8080,
                pathRewrite:{
                    '^/api':''
                }
            },
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                'components': '@/components',
                'content': 'components/content',
                'common': 'components/common',
                'assets': '@/assets',
                'network': '@/network',
                'views': '@/views',
                'api':"@/api"
            }
        },
        externals: {
            'AMap': 'AMap' // 高德地图配置
        }
    },

}
