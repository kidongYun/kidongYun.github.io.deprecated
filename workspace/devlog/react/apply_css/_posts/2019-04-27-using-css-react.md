---
layout: post
title:  "React - 2. The way how to using CSS format in React"
date:   2019-04-27 03:23:00 +0900
categories: react
---
Let's find out the way how to modify your __React__ project when you want to operate __CSS__ format files in yours

If it doesn't work with showing message like below. the reason doesn't operate is because you did't install the things relate to __CSS Styling__

<img src="/workspace/devlog/react/apply_css/res/1.png">

so now, we will install 2 packages using __npm__.

they are __css-loader__ and __style-loader__.

### 1. Let's install __css-loader__, __style-loader__ via __npm__ 

follow command below at your _React_ project folder

```
    .../my_react_express > npm install --save-dev css-loader style-loader
```

<img src="/workspace/devlog/react/apply_css/res/2.png">

### 2. Update your webpack.config.js file

add code below in your webpack.config.js

```js
    {
        test: /\.css$/,
        use: ['css-loader', 'style-loader']
    } 
```

Originally, your __webpack.config.js__ maybe is like below.

#### _Before_
```js
    module.exports = {
        entry: [
            './src/index.js'
        ],

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
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

Let's modify it like below.

#### _After_
```js
    module.exports = {
        entry: [
            './src/index.js'
        ],

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                }, 
                /////////////////////////////////////////////////////// START NEW CODE
                {
                    test: /\.css$/,
                    use: ['css-loader', 'style-loader']
                } 
                /////////////////////////////////////////////////////// END NEW CODE
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

Don't miss the __comma__ ',' between the code associated with _babel-loader_ and _css-loader_ when you modify your __webpack.config.js__

If you do the above successfully, then your React system will understand __.css__ files  
