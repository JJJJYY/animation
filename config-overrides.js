const { override, addLessLoader } = require('customize-cra');

module.exports = override(
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
        },
        postcssOptions: {
            plugins: [
              // 你的 PostCSS 插件列表
                require('autoprefixer'),
                require('postcss-nested')
            ],
        },
    }),
);