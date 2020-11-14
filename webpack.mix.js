const mix = require('laravel-mix');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const path = require('path');

mix.webpackConfig({
  plugins: [
    new VuetifyLoaderPlugin(),
  ],

  module: {
    rules: [{
      test: /\.pug$/,
      loader: 'pug-plain-loader'
    }],
  },
});

// 絶対パス設定
mix.webpackConfig({
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': __dirname + '/resources/assets/js'
    }
  },
})

mix.js('resources/assets/js/app.js', 'public/js')
  .sass('resources/assets/sass/app.scss', 'public/css')
  .sourceMaps(false)   
  .browserSync({
    files: 'public/**/*',
    server: 'public',
    proxy: false
  });
