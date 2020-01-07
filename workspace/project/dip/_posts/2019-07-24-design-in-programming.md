---
layout: post
title:  "Project. DIP"
date:   2019-07-24 11:21:54 +0900
categories: project
---

### 1. Background
> 웹 디자이너, 웹 퍼블리셔가 만드는 웹사이트는 소비되는 시간에 비해 생산시간이 너무 오래 걸린다라고 생각했습니다.
Android Studio나 Xcode의 Storyboard처럼 Drag and Drop 형태로 모든 걸 구현할 수 있다면 어떨까? 라는 생각에 이 프로젝트를 시작하게 되었습니다. <br><br> 총 4명이 진행한 프로젝트입니다. <br> _서버 사이드 기능 구현 - 1명_ <br> _웹 디자인 - 1명_ <br> _JS를 활용한 핵심기능 구현 - 2명_ <br><br> __저는 프로젝트 관리와 함께 JS를 활용하여 Drag and Drop 형태로 html소스를 만들어내는 핵심기능 구현 업무를 담당했습니다.__

<img src="/workspace/project/dip/res/index.png" style="width:80%;" />

<img src="/workspace/project/dip/res/list.png" style="width:80%;" />

<img src="/workspace/project/dip/res/workspace.png" style="width:80%;" />

### 2. Environment
> _Server : Linux + Apache + Mysql + PHP_ <br> _Language : HTML+CSS, ESMA6 Javascript_ <br> _Library : JQuery, VanilaJS_

### 3. Technical Detail
> __1. 객체지향 스타일의 Javascript 코딩을 하였습니다.__ <br> 다른 웹페이지들을 만들 때에는 Js의 기능이 부수적인 역할에 가까웠는데 이번 프로젝트에서는 JS로 다루는 작업이 방대해 Java처럼 객체를 다루는 형태로 코드를 구성했습니다. 그러면서 ECMA6 문법을 자주 사용했는데 function으로 class와 변수들을 정의하고, prototype으로 methods를 정의하는 것처럼 문법만 약간 다르지 
Java와 굉장히 유사해졌다는 것을 느꼈습니다. <br><br> __2. DIP Library를 제작하였습니다.__ <br> 만들기 시작해보니 Drag and Drop의 형태로 구현하려면 각 Component들이 DOM Attribute를 대부분 가져야 함을 느꼈습니다. 이를 위해 객체 모델링을 한 구조를 아예 라이브러리화 시켜서 보다 보편적으로 사용할 수 있도록 구현했습니다. 아마도 React.js와 같은 SPA 라이브러리도 이런식으로 시작하지 않았을까 생각했습니다. <br><br> __3. 전 보다 확실히 DOM 객체구조에 대한 이해도가 깊어졌습니다.__ <br> 이 프로젝트를 구현하기 위해서 가장 많이 사용한 함수들이 DOM객체에 대한 기본 함수들입니다. _getElementById()_, _previousSibling_, _offSet()_, _innerHTML_, _className_ ... 평소에는 잘 쓰지 않았던 많은 함수들을 사용하면서 _html_, _dom_ 에 대해서 좀 더 알 수 있었습니다. <br><br> __4. SPA 라이브러리 장점에 대해 보다 이해할 수 있었습니다.__ <br> 객체가 데이터를 가지고 있는 것과 그것을 렌더링하는 것이 별개로 동작했던 저의 코드에서는 그것이 불편할때가 많았고 또 서버와 통신이 잦았는데 이를 언제해야 효율적일지 고민하는 시간이 많았습니다. React.js
와 같은 SPA 라이브러리를 사용한다면 보다 쉽게 구현할 수 있음을 알았습니다.

### 4. Impression

> __1. 때에 따라서 라이브러리를 쓰지 않는 것이 이로울 때도 있다__ <br> 프로젝트를 계속 진행하면서 스스로 만들어 보자는 생각에 처음부터 모든 작업을 진행하니 SPA라이브러리를 활용해서 만들면 보다 편하지 않았을까 라는 생각이 들었었습니다. 그러나 명확히 이해하지 못했던 SPA라이브러리의 중요성들을 이런 노력에 의해 조금은 더 알 수 있었습니다. 비록 미흡했지만 충분히 좋은 공부가 된 프로젝트였습니다. <br><br> __2. 프로젝트 계획시 시간을 고려하는 것은 중요하다__ <br> 이 프로젝트의 가장 큰 문제점은 바로 시간 안배가 잘못 되었다고 생각합니다. 너무 짧은 시간내에 큰 프로젝트를 준비했고, 애초에 가능하지 않은 사이즈의 설계였습니다. 처음에 시간을 확실히 알고 이를 기반으로 프로젝트를 계획해야 한다는 걸 몸소 체험했습니다.

<br><br>

[Sample Video](https://www.youtube.com/embed/xnzGSJTywdI){: target="_blank"}, [Sample Site](/workspace/project/dip/res/demo/index.html){: target="_blank"}

[Github Source code](https://github.com/kidongyun/dip){: target="_blank"}