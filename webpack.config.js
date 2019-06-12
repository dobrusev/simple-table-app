const path = require('path');

module.exports = {
    entry: {
      app: './src/Main.js'
    },
    devServer: {
        contentBase: './bin'
	},
    output: {
        path: path.resolve(__dirname, 'bin'),
        filename: "main.js"
    }
};