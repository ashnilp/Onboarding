module.exports = { 
    mode: 'development',
    context: __dirname,
    entry: "./index.jsx",
    output: {
        path: __dirname + "/dist",   
        filename: "bundle.js"
    },
    watch: true,
    module: {
        rules: [
           {
                test: /\.jsx?$/,  
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                          presets: ['babel-preset-env','babel-preset-react']
                    }
                }
            },
            {
                test: /\.(s?)css$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader'
            }
        ]
    }
}