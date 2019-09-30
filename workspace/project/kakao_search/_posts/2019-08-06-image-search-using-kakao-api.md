---
layout: post
title:  "Project. Image Search (Kakaopay Internship)"
date:   2019-08-06 11:21:54 +0900
categories: project
---

### 1. Background
> 카카오 인턴쉽 과제로 Kakao Image Search API를 활용한 어플리케이션을 제작하였습니다. 약 7일간 진행하는 소규모 프로젝트이므로 시간관리는 물론 주어진 기능들을 우선적으로 개발하는 것과 본인 역량 가능한 범위 내에 유용한 기능들을 개발하는 것이 중요했습니다.

<img src="/workspace/project/kakao_search/res/ui.png" style="width:80%;"/>

### 2. Environment
> _Platform : Anroid Native App_ <br> _Language : Java_ <br> _Library : ConstraintLayout, JSONObject, Snackbar, PhotoView_

### 3. Technical Detail
> __1. ConstraintLayout__ <br> 이전에 WKU라는 프로젝트를 진행할 때에는 _LinearLayout_ 과 _RelativeLayout_ 을 적절히 섞어가면서 Layout작업을 진행했었습니다. IOS Storyboard에서 사용하는 제약조건을 활용한 레이아웃 디자인이 강력하다 생각했었는데 이것이 안드로이드에서는 _ConstraintLayout_ 임을 이번에 알게 되었고, 정말 편리하다는 느낌을 얻었습니다. <br><br> __2. Animation__ <br> 이번 프로젝트에는 _Scale Animation_, _Scroll Animation_, _Color Animation_ 3가지 종류의 animation이 들어갔습니다. Scale은 _Animation_      객체를 상속하여 구현하였고, Scroll은 _touchListener_, _Animation_ 를 상속, 마지막으로 Color는 _ValueAnimator_ 를 사용하였습니다. <br><br> __3. DownloadManager__ <br> 이미지 다운로드 기능을 구현하기 위하여 _DownloadManager_ 객체를 활용하였습니다. _checkPermission_ 을 통하여 예외처리를 구현하고 _BroadcastReceiver_ 를 통해 다운로드가 완료되었을 때 _Snackbar_ 알림을 띄우도록 했습니다.

<br><br>


[kidongyun.apk](/workspace/project/kakao_search/res/kidongyun.apk){: target="_blank"}

[source_code.zip](/workspace/project/kakao_search/res/source_code.zip){: target="_blank"}

[kidongyun.apk - From Github](https://github.com/kidongYun/ImageSearchApplication/blob/master/kidongyun.apk){: target="_blank"}

[Source code - From Github](https://github.com/kidongyun/ImageSearchApplication){: target="_blank"}