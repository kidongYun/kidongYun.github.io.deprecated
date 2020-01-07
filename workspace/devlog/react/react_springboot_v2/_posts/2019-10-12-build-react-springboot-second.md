---
layout: post
title:  "React - 6. Let's build React with Spring boot Server ver.2"
date:   2019-10-12 02:58:54 +0900
categories: react
---

## 1. Spring Boot를 활용한 Spring Framework 개발환경 구축

<br>

### Visual Studio Code 플러그인 확장.

> Ctrl + Shift + x 를 눌러 Marketplace를 열고 아래 두 항목을 찾아 Install한다.

```

    1. Java Extension Pack

    2. Spring Boot Extension Pack

```

<img src="/workspace/devlog/react/react_springboot_v2/res/1.png">

<img src="/workspace/devlog/react/react_springboot_v2/res/2.png">

### java.home 경로 설정

> 상단 메뉴에서 File > Preferences > Settings 으로 들어간 후 jdk를 검색하고 _'Edit in settings.json'_ 눌러 settings.json 파일 안에 java.home 값을 추가한다.

<img src="/workspace/devlog/react/react_springboot_v2/res/3.png">

<img src="/workspace/devlog/react/react_springboot_v2/res/4.png">


### Spring-boot project 생성

> Ctrl + Shift + p 를 눌러 나타난 상단 바에 _Spring Initalizr: Generate Maven Project Spring_ 을 선택한다.
<br><br> Java를 선택하고 원하는 Group Id와 Artifact Id를 작성한다. 예를 들어 Group Id가 _com.example_ 이고 Artifact Id가 _helloworld_ 이라면 패키지는 _com.example.helloworld_ 가 된다. 

<img src="/workspace/devlog/react/react_springboot_v2/res/5.png">

<img src="/workspace/devlog/react/react_springboot_v2/res/6.png">

<img src="/workspace/devlog/react/react_springboot_v2/res/7.png">

> Spring boot 버전은 최신 버전을 선택한다

<img src="/workspace/devlog/react/react_springboot_v2/res/8.png">

> 의존성은 아래 두가지 항목을 추가한다.

```

    1. (Spring Boot) DevTools
    
    2. (Spring) Web

```

<img src="/workspace/devlog/react/react_springboot_v2/res/9.png">

<img src="/workspace/devlog/react/react_springboot_v2/res/10.png">

> 파일탐색기가 열리면 프로젝트 생성을 원하는 폴더를 선택한다.

<img src="/workspace/devlog/react/react_springboot_v2/res/11.png">

> 성공적으로 프로젝트 생성이 완료되었다면 Open을 클릭해 프로젝트를 열자.

### JSP, JSTL을 위한 의존성 추가

> pom.xml을 열어 아래 두 의존성을 추가하기 위한 코드를 작성한다.

```xml

    <dependency>
        <groupId>org.apache.tomcat.embed</groupId>
        <artifactId>tomcat-embed-jasper</artifactId>
        <scope>provided</scope>
    </dependency>

```

```xml

    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>jstl</artifactId>
        <scope>provided</scope>
    </dependency>

```

### application.yml 파일 추가

> Spring-boot에서 프로젝트 설정은 annotation이나 application.properties 파일에서 처리된다. <br><br> application.properties 파일은 보기에 불편한 감이 있어 이를 삭제하고 application.yml 파일로 대체한다. <br><br>
src/main/resources/ 디렉토리에 있는 application.properties 파일을 제거하고 application.yml 파일을 생성한다. <br><br> 아래의 코드를 application.yml 파일 안에 작성한다.

```yml

spring:
  http:
    encoding:
      charset:    UTF-8
  mvc:
    view:
      prefix:     /public/
      suffix:     .html
server:
  tomcat:
    uri-encoding: UTF-8

```

### Spring Server 테스트 실행
> Ctrl + Shift + ` 또는 상단 메뉴에서 터미널을 클릭해 터미널을 띄운 후 프로젝트 루트 디렉토리에서 _mvnm spring-boot:run_ 명령어를 실행하여 서버가 잘 실행되는지 확인한다.

<img src="/workspace/devlog/react/react_springboot_v2/res/12.png">

> 실행이 잘 된다면 위와 같은 화면에서 터미널이 request를 listening하는 상태가 된다. 여기까지 한다면 Spring-boot를 활용한 Spring Framework 서버를 구현을 완료한 것이다.

## 2. React 개발환경 구축

### package.json 파일 생성

> 새로운 터미널을 하나 더 열고 프로젝트 루트 디렉토리에서 _npm init_ 명령어를 활용해 새로운 노드 프로젝트를 만든다. (모든 질문에 엔터만 눌러도 무방하며, 이 행위의 결과로 단순히 package.json 파일만 생성된다.)

<img src="/workspace/devlog/react/react_springboot_v2/res/13.png">

### React 의존 라이브러리 설치.

> React 개발환경 구성을 위해 react, react-dom, @babel/core, @babel/preset-env, @babel/preset-react, babel-loader, css-loader, style-loader, webpack, webpack-cli 의존 라이브러리를 설치한다.

```

    > npm i react react-dom

    > npm i @babel/core @babel/preset-env @babel/preset-react babel-loader css-loader style-loader webpack webpack-cli -D

```

<img src="/workspace/devlog/react/react_springboot_v2/res/14.png">

<img src="/workspace/devlog/react/react_springboot_v2/res/15.png">

> 설치가 잘 진행 되었다면 package.json 파일에 _dependencies_ 항목과 _devDependencies_ 항목에 설치한 라이브러리 이름들이 잘 추가되었을 것이다.

<img src="/workspace/devlog/react/react_springboot_v2/res/16.png">

### webpack 설정

> webpack 설정을 추가하기 위해 프로젝트의 루트 디렉토리에 webpack.config.js 파일을 생성하고 아래의 코드를 작성한다.

```js

var path = require('path');
 
module.exports = {
    context: path.resolve(__dirname, 'src/main/webapp/jsx'),
    entry: {
        first: './first/index.jsx',
        second: './second/index.jsx'
    },
    output: {
        path: __dirname,
        filename: './src/main/webapp/build/[name].bundle.js'
    },
    module: {
        rules: [ {
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [ '@babel/preset-env', '@babel/preset-react' ]
                }
            }
        }, {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        } ]
    }
};

```

## 3. Server Side Skeleton 코드 작성

### MyController.java

> React, Spring을 활용한 개발 환경은 구성되었다. 기본적으로 필요한 코드들을 작성해보자. 우선은 클라이언트 쪽에서 요청이 들어왔을 때 서버쪽에서 최우선적으로 처리해주는 Controller 자바코드를 작성하자. <br><br> src/main 안쪽 프로젝트의 패키지 경로에 _MyController.java_ 클래스 파일을 생성하고 아래의 코드를 작성한다.

```java

package com.example.helloworld;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
 
@Controller
public class MyController {
    @GetMapping("/{name}.html")
    public String page(@PathVariable String name, Model model) {
        return name;
    }
}

```

### first.html

> src/main/webapp/public 경로에 _first.html_ 파일을 만들고 아래의 코드를 작성한다. (해당 디렉토리가 없다면 생성한다.)


```html

<!doctype html>
<html>
<head>
    <title>FIRST PAGE</title>
</head>
 
<body>
    <div id="root"></div>
    <script src="../build/first.bundle.js"></script>
</body>
</html>

```

### second.html

> src/main/webapp/public 경로에 _second.html_ 파일을 만들고 아래의 코드를 작성한다. (해당 디렉토리가 없다면 생성한다.)


```html

<!doctype html>
<html>
<head>
    <title>SECOND PAGE</title>
</head>
 
<body>
    <div id="root"></div>
    <script src="../build/second.bundle.js"></script>
</body>
</html>
```

### first/app.css

> css-loader가 잘 동작하는지 확인하기 위해 src/main/webapp/css/first/app.css 파일을 만든다. 그리고 아래와 같이 코드를 작성한다 (해당 디렉토리가 없다면 생성한다.)

```css

.first { font-size: 24px; border-bottom: solid 1px black; }

```

### second/app.css

> css-loader가 잘 동작하는지 확인하기 위해 src/main/webapp/css/second/app.css 파일을 만든다. 그리고 아래와 같이 코드를 작성한다 (해당 디렉토리가 없다면 생성한다.)

```css

.second { font-size: 14px; background-color: yellow; }

```

## 4. Client Side Skeleton 코드 작성

### first/App.jsx

> src/main/jsx/first 폴더 아래에 App.jsx 파일을 생성하고 아래의 코드를 작성한다.

```jsx

import '../../css/first/app.css'

import React from 'react';
 
class App extends React.Component {
    render(){

        return (
            <h1 className="first">Hello First React Skeleton</h1>
        );
    }
}

export default App;

```

### first/index.jsx

> src/main/jsx/first 폴더 아래에 index.jsx 파일을 생성하고 아래의 코드를 작성한다.

```jsx

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

```

### second/app.jsx

>  src/main/jsx/second 폴더 아래에 App.jsx 파일을 생성하고 아래의 코드를 작성한다.

```jsx

import '../../css/second/app.css'

import React from 'react';
 
class App extends React.Component {
    render(){

        return (
            <h1 className="second">Hello Second React Skeleton</h1>
        );
    }
}

export default App;

```

### second/index.jsx

```jsx

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

```

### 클라이언트 스크립트 빌드

> React는 리소스 파일들을 바로 사용하지 않고 webpack을 활용하여 빌드한 후에 그 bundle 파일을 활용한다. <br><br> 위에서 만든 jsx 파일을 빌드하기 위해 터미널에서 루트 디렉토리로 이동하고 아래의 명령어를 작성한다. <br><br> watch 명령어는 JSX 파일 수정시에 자동적으로 지속 빌드할 수 있도록 도와준다.

```
    > node_modules/.bin/webpack --watch -d
```

### package.json 파일 script 수정

> 자주 사용하는 복잡한 명령어는 package.json 파일에서 script 옵션을 통해 간단하게 줄일 수 있다. script 옵션에 아래와 같이 추가한다. start에 들어가는 JAVA_HOME 옵션은 위에서 settings.json 파일에 추가한 java.home 경로와 같다. 본인의 환경에 맞도록 경로를 수정하자.

```json

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "set JAVA_HOME=C:\\Program Files\\Java\\jdk-12.0.2&&mvnw spring-boot:run",
    "watch": "node_modules\\.bin\\webpack --watch -d"
  }

```

## 5. 최종 빌드

```
    > npm run watch
```

> 루트 디렉토리에서 위와 같은 명령어를 작성하게 되면 webpack을 통해 bundle.js 파일을 만들게 된다. watch 옵션을 켜두었음으로 해당 명령어는 종료되지 않고 jsx 파일이 수정되면 자동적으로 새롭게 빌드된다.

<img src="/workspace/devlog/react/react_springboot_v2/res/17.png">

```
    > npm run start
```

> 위 명령어를 통해 Spring 서버가 실행되었다. 아래의 두 링크를 통해 만들어 놓은 Skeleton 코드들이 잘 동작하는지 확인하자.

[MainPage.jsx](http://localhost:8080/main.html)

[Page1Page.jsx](http://localhost:8080/page1.html)