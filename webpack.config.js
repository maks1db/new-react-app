const path = require('path');
const webpack = require('webpack');
const uglifyPlugin = webpack.optimize.UglifyJsPlugin;
const varReplace = require('./src/frontend/var-replace');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

//create folders
varReplace.checkDir(path.resolve(__dirname, 'public'));
varReplace.checkDir(path.resolve(__dirname, 'public/assets'));
varReplace.checkDir(path.resolve(__dirname, 'public/assets/js'));
varReplace.checkDir(path.resolve(__dirname, 'public/assets/css'));

const VarReplace = new varReplace({
    entry: path.resolve(__dirname, 'src/frontend/template', 'index.html'),
    output: path.resolve(__dirname, 'public', 'index.html')
});

const version = require('./package.json').version;

VarReplace
    .replace('{version}', `${isDevelopment ? '' : version}`)
    .replace('${content}', '')
    .replace('${initial-state}', '');

let publicPath = '/assets';
if (isDevelopment) {
    VarReplace
        .replace('${link-path}', '');
}
else {

    [path.resolve(__dirname, 'public/assets/css'), path.resolve(__dirname, 'public/assets/js')].forEach(p => {
        fs.readdirSync(p).forEach(f => {
            if (f === '.gitkeep') return;
            fs.unlinkSync(`${p}/${f}`);
        });
    });

    VarReplace
        .replace('${link-path}',`<link rel="stylesheet" href="${publicPath}/css/styles.min.css?v=${version}">`);
}

VarReplace.replace('${js-path}', publicPath + '/js/');
VarReplace.save();

const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            BROWSER: JSON.stringify(true),
            DEV: isDevelopment
        }
    }),

    //check bundle
    // new BundleAnalyzerPlugin({
    //     analyzerMode: 'static'
    // })
];

let entry = [],
    sassLoader = {},
    cssLoader = {};

if (!isDevelopment) {
    plugins.push(new uglifyPlugin({
        sourceMap: false,
        output: {comments: false}
    }));
    plugins.push(new ExtractTextPlugin(`/css/styles.min.css?v=${version}`));

    sassLoader = {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract( {
            fallback: 'style-loader', 
            use: 'css-loader!sass-loader',
            publicPath: '/assets/' 
        } )
    }; 

    cssLoader = {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
            publicPath: '/assets/' 
        })
    };

    //add polyffils
    entry.push('babel-polyfill');
}
else {
    
    entry.push('react-hot-loader/patch');
    plugins.push(new webpack.NamedModulesPlugin());
    plugins.push(new webpack.HotModuleReplacementPlugin());

    sassLoader = { 
        test: /\.scss$/, 
        use: ['style-loader', 
            'css-loader?source-map',
            'sass-loader'] 
    };

    cssLoader = {
        test: /\.css$/,
        use: ['style-loader', 
            'css-loader?source-map'] 
    };
}

entry.push('./src/frontend/index.jsx');

module.exports = {
    entry,
    output: {
        path:     path.resolve(__dirname, 'public', 'assets/'),
        publicPath: '/assets/',
        filename: `js/index.js${isDevelopment ? '' : '?v=' + version}`,
        sourceMapFilename: 'index.js.map'
    },
    devtool: isDevelopment && 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        hot: true
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src/frontend'),
            path.resolve(__dirname, 'src/frontend/components')
        ]
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: ['react-hot-loader/webpack', 'babel-loader']
        },
        sassLoader,
        cssLoader,
        {
            test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            loader: 'file-loader?name=[path][name].[ext]'
        },
        {
            test: /\.(png|gif)?$/,
            loader: 'file-loader?name=[path][name].[ext]'
        }
        ]
    },
    plugins: plugins
};