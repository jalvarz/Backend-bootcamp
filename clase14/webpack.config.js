const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports={
    entry: './src/index.js',
    mode: 'development',
    output:{
        path:__dirname+'/dist',
        filename: 'main.js'
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:[
                    'css-loader'
                ]
            },{
                test:/\.png$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name:'[name].[ext]',
                            outputPath:'statics/',
                            useRelativePath:true
                        }
                    }
                ]
            },
        ]
    }
}