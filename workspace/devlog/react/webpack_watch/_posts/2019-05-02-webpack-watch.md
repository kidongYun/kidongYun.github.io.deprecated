---
layout: post
title:  "React - 4. Let's update modification automatically in React using Webpack Watch attribute."
date:   2019-05-02 05:09:54 +0900
categories: react
---

### Let's update modification automatically in React using Webpack Watch attribute.

add code below in __webpack.config.js__

```js
    watch: true
```

this attribution named _watch_ is the function that can update __bundle.js__ file automatically.

and belows is the totally code of __webpack.config.js__

#### _before_
```js
    module.exports = {
        entry: [
        './src/index.js'
        ],

        module: {
            rules: [
                {
                    test: /\.(js|jsx|)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx']
        },

        output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
        }
    };
```

#### _after_

```js
    module.exports = {
        entry: [
        './src/index.js'
        ],

        module: {
            rules: [
                {
                    test: /\.(js|jsx|)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx']
        },

        output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
        },
        /////////////////////////////////////////////////////// START NEW CODE
        watch: true
        /////////////////////////////////////////////////////// END NEW CODE
    };
```

Don't forget to add comma between new code and previous thing.

then you can see the result below in the end when you use __npm run build__

```
    npm run build
```



