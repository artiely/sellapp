# sellapp

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 如果报错
```
$ npm run dev

> sellapp@1.0.0 dev C:\Users\Administrator\Desktop\www\sellapp
> node build/dev-server.js

events.js:160
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE :::8080
    at Object.exports._errnoException (util.js:1026:11)
    at exports._exceptionWithHostPort (util.js:1049:20)
    at Server._listen2 (net.js:1257:14)
    at listen (net.js:1293:10)
    at Server.listen (net.js:1389:5)
    at EventEmitter.listen (C:\Users\Administrator\Desktop\www\sellapp\node_modules\express\lib\application.js:617:24)
    at Object.<anonymous> (C:\Users\Administrator\Desktop\www\sellapp\build\dev-server.js:60:22)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.runMain (module.js:604:10)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3

```
表示端口被占用
> sellapp/config/index.js 

```javascript
dev: {
       env: require('./dev.env'),
       port: 8082, //此处修改端口即可
       assetsSubDirectory: 'static',
       assetsPublicPath: '/',
       proxyTable: {},
       // CSS Sourcemaps off by default because relative paths are "buggy"
       // with this option, according to the CSS-Loader README
       // (https://github.com/webpack/css-loader#sourcemaps)
       // In our experience, they generally work as expected,
       // just be aware of this issue when enabling this option.
       cssSourceMap: false
     }
```


