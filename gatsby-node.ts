const path = require('path')
exports.onCreateWebpackConfig = ({ actions }:any) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                'assets': path.resolve(__dirname, 'static/assets')
            },
        },
    })
};