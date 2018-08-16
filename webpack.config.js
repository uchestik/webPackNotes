const path = require('path'); //webpack run in the node.js environment
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: './src/index.js',
    output:{
        path: path.resolve(__dirname, 'build'), //reference to the directory the output property is to be saved. 
        //This has to be an absolute file reference. We will use a node helper path.
        filename: 'bundle.js', //what webpack should call the file that is created
        publicPath: 'build/' // this will be used by any loader that produces a direct file path reference to a file in the output directory
    },
    module:{ //This is the loader refered to as a module object. Each loader is refered to as a rule
        rules: [ //We can have multiple rules so we use an array
            {
                use: 'babel-loader',
                test:/\.js$/ //every regex property used in the test will be used by webpack and applied to the file names of all the files imported to our project
                //only apply babel to .js files.
            },
            { // we can specify rules with multiple loaders in a single rule. These are applied right to left. Order matters.
                loader: ExtractTextPlugin.extract({ //loader and use are the same thing. Loader is a bit legacy. This plugin falls back to legacy code
                    loader: 'css-loader' //plugins have a different context in webpack. plugins can keep files outside the webpack output
                }),
                test:/\.css$/
            },
            {
                test:/\.(jpe?g|png|gif|svg)$/,
                use:[
                    { //behaves differently based on the size of the image. we need to specify the size parameters
                        loader : 'url-loader',
                        options:{ limit : 40000 } //this means look for images that are 40000 bytes large. If image is greater than 40000 bytes save as different file.
                    }, 
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin('style.css') //this tells the plugin to take any files extracted by the plugin loader and save it into the style.css file
    ]
};

module.exports = config;