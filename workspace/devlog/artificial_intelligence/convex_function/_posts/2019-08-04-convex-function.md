---
layout: post
title:  "Machine Learning - Convex Function"
date:   2019-08-04 11:21:54 +0900
categories: artificial_intelligence
---

## Convex Function
> Convex 함수는 2차함수 처럼 볼록하게 생긴 함수를 말한다. 단순히 모양을 칭하는 말이지만 이것은 Gradient Descent에서는 꽤나 중요하게 작용한다.

_Convex Function_

<img src="/workspace/devlog/artificial_intelligence/convex_function/res/1.png" style="width:50%;"/>

_Non Convex Function_

<img src="/workspace/devlog/artificial_intelligence/convex_function/res/2.png" style="width:50%;"/>

> Gradient Descent 알고리즘에서 최소값을 구하기 위해서 미분이 0이 되는 지점을 찾는다. 만약 위에 그림에서 Non Convex Function과 같은 경우 미분이 0이 되는 지점이 2군데나 존재한다. 만약 Cost Function이 Non Convex 모양이라면 랜덤하게 시작되는 처음 위치에 따라서 올바른 최소값을 찾아갈수도 있고 그렇지 않을 수도 있다. 이렇게 되면 훌륭한 알고리즘이라고 보기 어려워진다. 따라서 Gradient Descent에서는 Cost Function을 Convex한 모양으로 유지시켜주는 것이 중요하다.

## Global Minimum, Local Minimum
> Non Convex Function에서 최소값이 여러군데에서 존재할 때. 전역 범위에서 가장 작은 값은 Global Minimun 이라고 하고 국지적인 관점에서 작은 값을 Local Minimum 이라고 한다. 위의 그래프에서 빨간 점선이 Global Minimim 에 해당하고 보라색 점선이 Local Minimum이다.

<img src="/workspace/devlog/artificial_intelligence/convex_function/res/3.jpg" style="width:80%;"/>

> 위 그래프는 변수가 2가지 일때 나타나는 Non Convex 모델이다. 파란색으로 칠해진 부분이 Minimum에 가까워지는 부분이며, 총 2군데가 있음을 알 수 있다. Non Convex 모델에 따른 Local Minimum 문제를 해결하기 위해서는 Gradient Descent 알고리즘을 사용시에 Cost Function을 Convex 모형으로 변형 시켜주는 것이 최선이다. 대표적으로 Cross Entropy loss 알고리즘이 있다.