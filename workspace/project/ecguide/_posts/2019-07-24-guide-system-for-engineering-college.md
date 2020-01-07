---
layout: post
title:  "Project. Ecguide"
date:   2019-07-24 11:21:54 +0900
categories: project
---

### 1. Background
> 공과대학 건물은 하늘에서 보면 'ㅍ'모양으로 많은 사람들이 길을 잃기 쉽게 만들어진 구조입니다. 또 5층 건물로 약 200개의 교수실, 연구실, 강의실들이 있어서 한번에 그 장소를 찾기는 쉽지 않습니다. 그래서 공과대학 정문에 키오스크 단말기를 설치하여 필요시 간편하게 위치를 찾을 수 있도록 안내해주는 서비스입니다. <br><br> 총 4명이 함께 진행한 프로젝트입니다. <br> _프로젝트 관리 - 공과대학장_ <br> _3D 지도 이미지 구현 - 건축학과 학생_ <br> _웹 디자인 - 컴퓨터공학과 학생_ <br> _웹 서버 및 기능 구현 - 컴퓨터공학과 학생_ <br><br> __저는 웹 서버 및 기능 구현을 담당했습니다.__


<img src="/workspace/project/ecguide/res/ecguide.png"/>

### 2. Environment
> _Server : Linux + Apache + Mysql + PHP_ <br> _Language : HTML+CSS+JS_ <br> _Library : JQuery, Google Speech API_

### 3. Technical Detail
> __1. Google Speech API는 SSL 위에서 동작합니다.__ <br>
Google Speech API는 테스트 환경에서 문제없이 동작했습니다. 그러나 원광대학교 서버에 이 서비스를 올리고 실행해보니 STT 서비스가 잘 동작하지 않았습니다. 문제는 HTTP에서 이 서비스를 지원하지 않는 것이였습니다. 반드시 HTTPS 를 써야하는데 원광대학교 서버가 이를 지원하지 않았습니다. 그래서 아쉽게도 최종 결과물에서는 STT기능이 제외되어 있습니다. <br><br>  
__2. Domain Name System 구조에 대한 이해__ <br> 예전에 CCNA를 공부할 때 각 시스템의 _hosts_ 파일을 통해 IP에 Domain Name을 설정할 수 있음을 알고 있었습니다. 그러나 _ecguide.wku.ac.kr_ 의 의미는 '한국(kr) 도메인 서버에 저장된 많은 리스트 중에 아카데미(ac) 도메인 서버로 연결되고, 또 이 서버의 리스트들 중 원광대(wku) 도메인 서버가 연결되고, 마지막으로 ecguide가 원광대(wku) 도메인 서버에 물려있다는 의미'임을 이번에 확실히 이해하게 되었습니다.

### 4. Impression
> __1. 업무시 의사소통의 중요성__ <br>
이 프로젝트 진행 시에 저 스스로에게 가장 아쉬웠던건 교수님의 제안에 대해서 한번도 부정적인 언급을 하지 못했다는 것입니다.
시간이 많이 소요되는 작업이면 그렇다고 이야기를 해야하고, 또 나의 역량 밖의 업무인지 아닌지를 이야기를 해야하는데 그렇게 하지를 못했던 것 같습니다. 프로젝트를 함께한다면 일방향적인 소통이 아니라 모두 자신의 이야기를 해야한다는 중요성을 느꼈습니다.
<br><br> __2. 디자인은 디자이너에게__ <br>
전공자는 다르다는 말은 음악할 때도 그렇고 여러번 들었던 이야기 인데 이번 프로젝트를 하면서도 느끼게 되었습니다. 자원이 된다면 해당 업무는 해당 업무의 전공자에게 맡기는게 대부분의 경우 최선의 선택이라는 것을 느꼈습니다.

<br><br>

[Sample Site](http://ecguide.wku.ac.kr/Ecguide/home.php){: target="_blank"}

[Github Source code](https://github.com/kidongyun/ecguide){: target="_blank"}