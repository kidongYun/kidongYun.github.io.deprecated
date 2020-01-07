---
layout: post
title:  "Machine Learning - Alpha. Learning Rate"
date:   2019-08-02 11:21:54 +0900
categories: artificial_intelligence
---

### Learning rate 란?

$$ w_{n+1} = w_n - \alpha { \partial \over \partial w} Cost Function $$

<br/>

<img src="/workspace/devlog/artificial_intelligence/learning_rate/res/1.png" style="width:50%;"/>

> 위 수식과 그래프는 Gradient Descent 알고리즘을 표현한다. 그래프에서 빨간 점은 반복됨에 따라서 점점 최소값을 향해 가고 있다. 위 수식에서 alpha는 learning rate라고 불리며 학습을 진행할 때 Step size를 조절하는 하이퍼 파라미터이다. 즉 alpha 값이 크다면 빨간점이 한 반복에서 크게 변화하고 작다면 반대로 조금씩 변화하게 된다.

### 너무 작은 Learning Rate, 너무 큰 Learning Rate.
> Learning rate가 작으면 좋을까, 크면 좋을까 이는 한쪽으로 치중될 수 없으며 적절한 수치를 찾아야 한다.
너무 작았을 때에 일어날 수 있는 문제점과 마찬가지로 너무 클 경우에 발생할 수 있는 문제점에 대해서 알아보자.

<img src="/workspace/devlog/artificial_intelligence/learning_rate/res/2.png" style="width:100%;"/>

> Learning Rate가 너무 작을 경우 반복을 충분히 했음에도 불구하고 최소값에 다다르지 못하고 중단되는 현상이 발생할 수 있다. 이를 개선하기 위해 Learning Rate 값을 작게 그대로 두고 반복을 더욱 많이 한다면 이는 Computing Resource를 더욱 많이 사용하게 됨으로 시스템에 부하가 걸릴 수 있다. 또 Cost Function이 완전한 Convex Function이 아닐경우 작은 언덕 하나 넘지 못하고 Local minimum에 빠질 수 있다. 아래에 그래프 중 가장 왼쪽의 Too low 그래프를 참조하자.

> 반대로 Learning Rate가 너무 클 경우 값이 최소값에 다다르지 못하고 오히려 더 커질 수가 있다. 즉 수렴하지 못하고 발산하려 한다.

<img src="/workspace/devlog/artificial_intelligence/learning_rate/res/learningRate.jpeg" style="width:70%;"/>

> 위 그래프는 learning rate가 반복되면서 loss (= error) 가 어떻게 변하는지를 보여주는 그래프이다. <br/><br/> __Very high learning rate__ <br/> 위에서 언급한대로 최소값에 수렴하지 못하고 오히려 발산하는 현상이다. 보면 반복됨에 따라 loss 값이 반대로 올라가고 있다. <br/><br/> __Low learning rate__ <br/> 마찬가지로 위에서 언급한 형태이다. Good learning rate와 비교해서 보면 너무 작은 Step size로 최종적으로 최소값에 도달하지 못했다. <br/><br/> __Hight learning rate__ <br/> High learning rate는 Very High learning rate와는 다르게 수렴은 하고있다. 그러나 보면 최소점에 다다르지 못하고 일정 Loss 값을 유지하고 있다. 이는 Step size가 커서 저 작은 값들로 내려가지 못하는 현상이다. 최소값을 두고 빙글빙글 돌고 있는 형태로 보면 되겠다. 

### Gradient descent 알고리즘은 최저점에 다다를수록 보다 더 섬세하게 다가간다.
> 처음에 하나의 Learning rate를 정하게 되면 그 Step size로 계속 최소값에 다다르는 줄 알았었다. 하지만 Gradient Descent 알고리즘을 면밀히 살펴보니 그렇지 않음을 알았다.

$$ w_{n+1} = w_n - \alpha { \partial \over \partial w} Cost Function $$

> 위의 Gradient Descent 수식을 보면 다음 w값은 이번 w값에 Learning rate와 Cost의 미분한 값을 곱하여 차감한다. 비록 Learning rate값은 지속 동일하여도 cost의 값이 최저점에 다다를수록 점점 작아지기 때문에 Gradient Descent 알고리즘의 관점에서 보면 Step size는 점점 작아진다.


