const path = require('path')
const { copyLibFiles } = require('@builder.io/partytown/utils');

// exports.onPreBuild = async () => {
//   await copyLibFiles(path.join(__dirname, "public/static", "~partytown"));
// };
// exports.onPreBootstrap = async () => {
//     await copyLibFiles(path.join(__dirname, "public/static", "~partytown"));
//   };
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