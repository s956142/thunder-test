const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { RetryChunkLoadPlugin } = require('webpack-retry-chunk-load-plugin');

module.exports = {
    entry: ['@babel/polyfill', './src/index.tsx'],
    resolve: { // webpack預設只讀取js，添加extensions使可讀ts
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    output: {
        path: path.resolve(__dirname, './build/'),
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[name].[chunkhash].js'
    },
    module: {
        rules: [
            { // for ES6 up ts
                test: /.ts$/,
                exclude: /node_module/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/typescript', '@babel/preset-env']
                    }
                }
            },
            { // for TSX
                test: /.tsx$/,
                exclude: /node_module/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/typescript', '@babel/preset-react', '@babel/preset-env']
                    }
                }
            },
            { // for CSS
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            { // for SCSS/SASS
                test: /\.(scss|sass)$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            { // for image
                test: /\.(png|jpe?g|gif|ico)$/i,
                loader: 'url-loader', // url-loader可將資源轉為base64格式，提高效能(但增加bundle.js size)
                options: {
                    // name: '[name].[hash].[ext]',
                    name: (resourcePath, resourceQuery) => {
                        if (/assets\/img\/favimg/.test(resourcePath)) {
                            return '[name].[ext]';
                        }

                        return 'asssts/img/[name].[hash].[ext]';
                    },
                    limit: 8192, // 單位bytes, 限制可轉為base64資源的大小, 超過大小改使用file-loader
                    esModule: false
                }
            },
            { // for media
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'assets/media/[name].[chunkhash].[ext]',
                    limit: 8192,
                }
            },
            { // for font style
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'assets/fonts/[name].[hash].[ext]',
                    limit: 8192,
                }
            },
            { // for svg
                test: /\.svg$/,
                use: [
                    { loader: 'file-loader' }
                ]
            },
            {
                test: /\.webmanifest$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            esModule: false
                        }
                    }
                ]
            },
        ]
    },
    devServer: {
        inline: true,
        port: 3000,
    },
    plugins: [
        new Dotenv({
            systemvars: true,
        }),
        // 用來產生build/index.html
        new HtmlWebpackPlugin({
            template: `${__dirname}/src/assets/index.html`,
            filename: 'index.html',
            inject: 'body', // 把output的js引用到產生的html body內
            API_ENV: process.env.API_ENV
        }),
        new RetryChunkLoadPlugin({
            timeout : 3000,
            maxRetries :3 
        })
    ]
};