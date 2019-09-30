---
layout: post
title:  "Project. Wonkwang Univ. Intra Application"
date:   2019-05-10 11:21:54 +0900
categories: project
---

### 1. Background
> 기존의 원광대 정보서비스는 오직 데스크탑 기준의 웹서비스만 제공했기에, 항상 불편함을 겪는 원광대 학생들의 편의를 위해 모바일에 UI가 최적화된 어플리케이션을 개발했습니다. <br><br> 1인 개발로 진행한 이 프로젝트는 기존에 제공된 캠퍼스 지도, 학사일정, 출결 조회, 장학금 조회, 시간표 조회, 성적 조회, 기숙사 외박 신청, 생리 공결 신청, BBS 조회 등을 보다 편리하게 이용할 수 있도록 개선하고 강의 공지 알림, 시간표 위젯, 필수 이수 과목 정보 제공, 교내 연락처 정보 제공 기능을 추가하였습니다. <br><br> 긍정적인 평가, 적극적인 지지도 받았지만 아쉽게도 학사 정보보안 관련 문제로 인해 서비스를 중단하게 되었습니다. 

<img src="/workspace/project/wku/res/uxui_1.jpg"/>

<img src="/workspace/project/wku/res/uxui_2.jpg"/>

<img src="/workspace/project/wku/res/uxui_3.jpg"/>

### 2. Environment
> _Platform : Android Native Application_ <br> _Language : Java_ <br> _Database : SQLite_ <br> _Library & Detail : Jsoup, MPAndroidChart, RSA Encryption, Viewpager_

### 3. Technical Detail
> __1. Jsoup Library를 활용하여 학사정보 데이터들을 크롤링하였습니다.__ <br>
로그인이 필요한 페이지는 세션 데이터가 요구되어 바로 html 데이터를 가져올 수 없었습니다. 그래서 먼저 로그인 시도를 하고 그 때 서버가 주는 세션값을 활용하여 웹정보시스템에 접근할 수 있었습니다. 그 이후 필요한 데이터들을 가진 각 웹 페이지를 html형태로 가져오고, css문법으로 parsing하여 크롤링하였습니다. <br><br>
__2. Infinity Scroll 형태로 RecycleView의 부하를 감소시켰습니다.__ <br>
BBS의 경우 누적된 내용이 많아 한번에 모든 것을 가져오면 로딩이 심했습니다. 이를 해결하기 위해 RecycleView에 데이터를 넣을 때 한번에 모든 데이터를 넣지 않고 Infinity Scroll 형태로 사용자가 일정 콘텐츠 이상 보았을 경우에만 새롭게 데이터를 갱신하도록 만들었습니다.<br><br> 
__3. Multi Thread 기법으로 많은 업무를 Background에서 진행시켰습니다.__ <br> 
처리해야하는 작업이 많아짐에 따라 UI가 느려지는 현상을 몸소 경험했습니다. 이를 위해 무거운 Database에 접근하는 작업이나, 크롤링과 같이 환경에 따라 느려질수 있는 Network 업무들은 Multi Thread로 구현하였습니다. 이후에 Swift를 배울 때 UI를 제외한 다른 업무들은 일반적으로 다른 Thread를 활용하여 구현한다는 것을 깨달았습니다. <br><br> 

### 4. Impression
> 내가 만든 서비스를 다른사람이 행복하게 쓰는 모습을 보면서 나 또한 뿌듯함을 느꼈고 결국 __개발자로 살아가야겠다는 확신을 얻는 계기가 된 프로젝트입니다.__ <br><br> 아쉬웠던 부분은 정보보안의 문제로 인해 서비스를 결국 내리게 되면서 내가 만들고 싶다고 해서 모든 콘텐츠를 만들수는 없다는 걸 느낀 것과 Android Native App으로 구현하게 되면서 IOS계열 스마트폰에 서비스할 수 없었던 것이 였습니다.

<br><br>

[Sample Video 1](https://www.youtube.com/embed/6pwatQ0UGXw){: target="_blank"}

[Sample Video 2](https://www.youtube.com/embed/TYq4YvBenwg){: target="_blank"}

[Github Source code](https://github.com/kidongyun/wku){: target="_blank"}