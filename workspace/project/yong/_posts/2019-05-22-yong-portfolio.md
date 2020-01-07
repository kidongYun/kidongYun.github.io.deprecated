---
layout: post
title:  "Project. Yong Portfolio"
date:   2019-05-22 20:24:54 +0900
categories: project
---

### 1. Background
> 디자이너 포트폴리오 전시를 위한 정적 페이지입니다. 시각디자인을 전공한 디자이너분께서는 작품들을 전시할 웹사이트를 필요로 하셨고 이를 위해 이 사이트를 제작하였습니다. 기존에 작업했던 디자인 작품을 활용하였고 __저는 기본적인 레이아웃 구성, 이미지들의 유연한 리사이징, 애니메이션과 같은 웹 퍼블리싱 업무를 하였습니다.__  

<img src="/workspace/project/yong/res/1.png" style="width:100%;"/>

<img src="/workspace/project/yong/res/2.png" style="width:100%;"/>

<img src="/workspace/project/yong/res/3.png" style="width:100%;"/>

<img src="/workspace/project/yong/res/4.png" style="width:100%;"/>

<img src="/workspace/project/yong/res/5.png" style="width:100%;"/>

### 2. Environment
> _Server : Git Page_ <br> _Language : HTML+CSS+JS_ <br> _Library : JQuery_

### 3. Technical Detail
> __1. Apache Web Server에서 Git Page로 서버 변경하였습니다__ <br>
테스트 서버로 구축해둔 LAMP Server가 있었습니다. 평소처럼 이를 사용하는 중에 Git Page를 알게 되었습니다. Server side에서 일종의 처리를 진행하지 않는, 즉 _Tomcat_, _JBoss_ 와 같은 WAS Middleware를 사용하지 않는 정적페이지는 Git Page에서 무료로 호스팅해준다는 것을 알게되었고 Web server를 변경하였습니다. <br><br> __2. 모바일과 PC 모두를 고려하여 Reactive Web으로 구현하였습니다__ <br> 단순히 _Media tag_ 를 활용하여 반응형 웹을 구현할 수 있다는 것을 이해하고 테스트 코드 수준으로만 반응형 웹을 구현했었던 순간을 반성하게 되는 기회였습니다. 가장 어려웠던건 이미지의 비율을 유지하면서 화면의 크기에 따라 배치도 유연하게 하는 것이였는데 _CSS Flex Attribute_ 를 활용하여 이 문제를 해결할 수 있었습니다. <br><br> __3. One Web server, Multi Service__ <br> 프로젝트 내용 자체에는 관련이 없지만 하는 중에 알게된 내용입니다. IP가 한 개, 동일한 Web Server 장비에서 여러 개의 서비스를 할려면 Domain으로 구분하여 할 수 있다는 것을 알게 되었습니다. Apache 서버의 경우 _httpd.conf_ 설정파일 안에 _virtual-host_ 를 늘린다음 각 host마다 별도의 도메인을 설정해주면 됩니다.

### 4. Impression
> 항상 개발자들끼리 협업을 진행하다가 제대로 디자이너와 협업을 하게 된 첫 프로젝트라고 생각합니다. 이 프로젝트 중 많은 색다름을 겪었는데 그 중 하나가 font 작업이였습니다. 이 디자이너분이 보내주신 폰트 파일은 otf 형식으로 200MB가 넘어서 깜짝놀라 확인해보니 이는 아마도 통합본의 의미를 가지는 것 같았습니다. 결국 필요한 것만 골라내어 용량 줄이기에 성공했습니다.

<br><br>

[Sample Site](https://kidongyun.github.io/workspace/project/yong/res/demo){: target="_blank"}

[Github Source code](https://github.com/kidongyun/yong){: target="_blank"}