---
layout: post
title:  "React - 1. Let's build React with Express Server"
date:   2019-04-26 02:58:54 +0900
categories: react
---

If you are the first __React__, please search __create-react-app__, see other posts.

Building React Service manually without __create-react-app__ is somewhat difficult for beginners.

I will build __React__ via __npm__ package manager. It needs __node__ so if you don't have then please download in [here](https://nodejs.org/ko/download/).

### 1. To create __node__ project
First of all, you should make the directory for using your react project. 

```
    ... > mkdir my_react_express
    ... > cd my_react_express
    .../my_react_express > 
```

when you want to make __node__ project, you just use command below.
```
    .../my_react_express > npm init -y
```
if you don't use the option '-y' then you should treat the detail of your new node project.

<img src="/workspace/devlog/react/react_express/res/1.png">

and you can check __package.json__ file in your project directory.

<img src="/workspace/devlog/react/react_express/res/2.png">

<img src="/workspace/devlog/react/react_express/res/3.png">

### 2. To install __express__, __react__, __react-dom__ at dependecies

follow below command at your folder

```
    .../my_react_express > npm install -save express react react-dom
```

<img src="/workspace/devlog/react/react_express/res/4.png">

You can see __node_modules__ folder in your react directory.
and you can also check the new addition, associated with __express__, __react__, __react-dom__ at __dependencies__ of package.json

<img src="/workspace/devlog/react/react_express/res/5.png">

<img src="/workspace/devlog/react/react_express/res/6.png">

### 3. To install __@babel/core__, __@babel/preset-env__, __@babel/preset-react__, __babel-loader__, __webpack__, __webpack-cli__ at devDependecies

follow command below at your folder

```
    .../my_react_express > npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader webpack webpack-cli
```

and then Let's check your __package.json__ file one more.

<img src="/workspace/devlog/react/react_express/res/8.png">

__devDependencies__ entry has been added to __package.json__ file, and what is installed in it.


### 4. Let's consist all files, folders properly to your React directory.

#### First, Let's make 3 folders in your React directory.

<img src="/workspace/devlog/react/react_express/res/9.png">

follow command below.
```
    .../my_react_express > mkdir public
    .../my_react_express > mkdir server
    .../my_react_express > mkdir src
```

<img src="/workspace/devlog/react/react_express/res/10.png">

<img src="/workspace/devlog/react/react_express/res/11.png">

#### next step, make 6 files in your React directory.

```
    .../my_react_express/webpack.config.js
    .../my_react_express/.babelrc
    .../my_react_express/public/index.html
    .../my_react_express/src/App.js
    .../my_react_express/src/index.js
    .../my_react_express/server/main.js
```

<img src="/workspace/devlog/react/react_express/res/12.png">

### 5. Let's fill in your new files.

#### .../my_react_express/webpack.config.js

typing code below in your __webpack.config.js__

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

One of the important features of __webpack__ is gathering static files and resources together and then extract what to __bundle.js__

#### .../my_react_express/.babelrc

```js
    {
        "presets": ["@babel/preset-env", "@babel/preset-react"]
    }
```

#### .../my_react_express/public/index.html

```html
    <!DOCTYPE html>
    <html>
 
        <head>
            <meta charset="UTF-8">
            <title>React App</title>
        </head>
 
        <body>
            <div id="root"></div>
            <script src="/bundle.js"></script>
        </body>
 
    </html>
```

#### .../my_react_express/src/App.js

```js
    import React from 'react';
 
    class App extends React.Component {
        render(){
 
            return (
                <h1>Hello React Skeleton</h1>
            );
        }
    }
 
    export default App;
```

#### .../my_react_express/src/index.js

```js
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';
 
    const rootElement = document.getElementById('root');
    ReactDOM.render(<App />, rootElement);
```

#### .../my_react_express/server/main.js

```js
    var express = require('express')
    var app = express()
    var path = require('path')

    app.use(express.static('public'))

    app.listen(3000, function() {
        console.log("start! express server on port 3000")
    })

    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"))
    })
```

### 6. Update new code your __package.json__ file

please add new code below in your __scripts__ of __package.json__

```js
    "start": "nodemon ./server/main.js",
    "build": "webpack -p"
```

The below is all the code in __package.json__ 

```js
    {
        "name": "my_react_express",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            /////////////////////////////////////////////////////// START NEW CODE
            "start": "nodemon ./server/main.js",
            "build": "webpack -p"
            /////////////////////////////////////////////////////// END NEW CODE
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "dependencies": {
            "express": "^4.16.4",
            "react": "^16.8.6",
            "react-dom": "^16.8.6"
        },
        "devDependencies": {
            "@babel/core": "^7.4.3",
            "@babel/preset-env": "^7.4.3",
            "@babel/preset-react": "^7.0.0",
            "webpack": "^4.30.0",
            "webpack-cli": "^3.3.1"
        }
    }

```

if you don't do thing above, you can't execute your __React__  

### 7. Run your React using npm script

follow code below
```
    .../my_react_express > npm run build
```
as I mentioned before, if you finished, you can get a __bundle.js__ file.

```
    .../my_react_express > npm start
```

Finally, Let's go to [localhost:3000](http://localhost:3000)

<img src="/workspace/devlog/react/react_express/res/13.png">

Thank you for reading so far.
