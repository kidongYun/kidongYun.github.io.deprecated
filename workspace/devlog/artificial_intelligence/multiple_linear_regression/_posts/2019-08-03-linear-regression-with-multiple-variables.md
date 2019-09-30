---
layout: post
title:  "Machine Learning - Linear Regression with Multiple Variables"
date:   2019-08-03 11:21:54 +0900
categories: artificial_intelligence
---

## Hypothesis 확장

$$ y = wx + b $$

> Simple Linear Regression은 입력되어질 수 있는 변수가 x 한가지이다. 보다 복잡한 상황들을 견뎌낼 수 있는 모델이 필요하다. 이번에는 변수를 2개 이상 가질 수 있는 Linear Regression을 소개한다.

$$ y = w_2x_2 + w_1x_1 + b $$

> 이는 변수 2개를 가질 수 있는 모델이며 같은 방법으로 계속 확장해 나갈 수 있다.

$$ y = ... w_3x_3 + w_2x_2 + w_1x_1 + b $$

> 만약 행렬을 쓴다면 위의 수식을 아래처럼 보다 간단하게 표현할 수 있다

$$ y = WX + b $$

$$ 
W = 
\begin{pmatrix}
w_1 & w_2 & w_3 & ...
\end{pmatrix}
\,\,\,\,\,\,
$$
$$
X =
\begin{pmatrix}
x_1 \\
x_2 \\
x_3 \\
...
\end{pmatrix}
$$

> 변수가 2개일 때의 Linear Regression의 Hypothesis를 살펴본다면 아래와 같을 것이다. 마찬가지로 변수가 3개일 때는 4차원의 공간에 표현된다. 즉 변수 한개가 늘어날 수록 이를 그래프로 표현하기 위해서는 차원이 하나씩 늘어나야 함을 의미한다.

<img src="/workspace/devlog/artificial_intelligence/multiple_linear_regression/res/1.png" style="width:50%;"/>


## 용어의 의미.

$$ y = ...\,w_3x_3 + w_2x_2 + w_1x_1 + b $$

> Regression 이론에서 사용되는 용어들을 다시 한번 정리할 필요성 있다. Linear Regression이 변수가 1개였던 때 보다 모델이 확장되면서 이 모델을 바라보는 시선도 조금은 바뀌어야 한다. x값 1개에 무조건 w값 1개가 붙어있다. 이 의미는 x라는 입력값이 y를 도출하는데에 얼마나 중요한 요인인가에 따라서 그 중요도를 w값에 숫자로 넣는 것이다. 그래서 w값은 weight 즉 가중치를 의미한다. x값은 machine learning에서 보통 특성값이라고 한다. 결국 machine learning은 데이터의 특성을 학습하는 것이고 그 특성에 따라 모델이 데이터를 잘 표현하게 된다. 

## Cost Function 확장

$$ Cost\,Function = {1 \over 2n}\sum_{i=1}^{n} (wx_i + b - y_i)^2 $$

> 변수가 1개일 때의 Cost Function이다. 이를 변수가 여러개 일때도 사용할 수 있도록 확장시켜 보자.
확장된 Hypothesis를 적용시키면 될것이다. 혼란을 방지하기 위해서 각 데이터를 의미하는 i 변수는 아래첨자에서 윗첨자로 변경하였다.

$$ Cost\,Function = {1 \over 2n}\sum_{i=1}^{n} ((w_1x_1^{(i)} + w_2x_2^{(i)} + w_3x_3^{(i)} + ... + b) - y^{(i)})^2 $$

$$ Cost\,Function = {1 \over 2n}\sum_{i=1}^{n} (WX^{(i)} + b) - y^{(i)})^2 $$

## Gradient Descent 확장

> 늘어난 변수만큼 각 변수에 대하여 편미분을 진행한 다음 Gradient Descent 알고리즘에 따라 가중치 값을 바꾸어 주자. 우선 편미분을 진행하면 다음과 같다.

$$ {\partial \over \partial w_1} Cost\,Function = {1 \over n} \sum_{i=1}^{n} (w_1x_1^{(i)} + w_2x_2^{(i)} + w_3x_3^{(i)} + ... + b - y^{(i)}) (x_1^{(i)}) $$

$$ {\partial \over \partial w_2} Cost\,Function = {1 \over n} \sum_{i=1}^{n} (w_1x_1^{(i)} + w_2x_2^{(i)} + w_3x_3^{(i)} + ... + b - y^{(i)}) (x_2^{(i)}) $$

$$ {\partial \over \partial w_3} Cost\,Function = {1 \over n} \sum_{i=1}^{n} (w_1x_1^{(i)} + w_2x_2^{(i)} + w_3x_3^{(i)} + ... + b - y^{(i)}) (x_3^{(i)}) $$

$$ ... $$

$$ {\partial \over \partial b} Cost\,Function = {1 \over n} \sum_{i=1}^{n} (w_1x_1^{(i)} + w_2x_2^{(i)} + w_3x_3^{(i)} + ... + b - y^{(i)}) $$

> 아래는 Gradient Descent 알고리즘이 적용될 Delta Rule이다.

$$ w_1^{(n+1)} = w_1^{(n)} - \alpha { \partial \over \partial w_1} Cost Function $$

$$ w_2^{(n+1)} = w_2^{(n)} - \alpha { \partial \over \partial w_2} Cost Function $$

$$ w_3^{(n+1)} = w_3^{(n)} - \alpha { \partial \over \partial w_3} Cost Function $$

$$ ... $$

$$ b^{(n+1)} = b^{(n)} - \alpha { \partial \over \partial b} Cost Function $$
