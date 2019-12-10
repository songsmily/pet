module.exports = {
    devServer:{
        proxy:{
            '/api':{
                target:"http://localhost:8099",
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
            }
        },

    },

}
