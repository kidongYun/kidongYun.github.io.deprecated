---
layout: post
title:  "Machine Learning - Logistic Regression"
date:   2019-08-04 11:21:54 +0900
categories: artificial_intelligence
---

## Logistic Regression의 필요성 및 Linear Regression의 한계

<img src="/workspace/devlog/artificial_intelligence/logistic_regression/res/1.png" style="width:50%;"/>

<img src="/workspace/devlog/artificial_intelligence/logistic_regression/res/2.png" style="width:50%;"/>


> Linear Regression은 일반적으로 결과인 y값이 연속적인 값을 가질때 데이터르 표현하기에 유용하다. 그러나 만약 y값이 이산적이라면 어떨까. 두번째 그래프는 y값이 붉은색과 푸른색으로 2가지 형태만 가지고 있다. 합격과 불합격을 의미하도록 만들었다. 데이터가 만약 이러한 특성을 가진다면 Linear Regression 모델만으로는 이산적인 값을 가지는 데이터들을 표현하기는 부적합하다. 그래서 Logistic Regression을 사용한다. 

> 부가적인 설명으로 machine learning 에서는 y값이 이산적인 상황에서 사용되는 기법을 Classification 이라고 한다. 대표적으로 KNN, SVM 모델들을 예로 들수 있으며, Regression은 함수식으로 표현되기 때문에 연속적인 수치들도 표현이 가능하다. 그러나 Regression에서도 이산적인 경우를 위한 방법을 제공하는데
이를 Logistic Regression이라고 한다.

## Sigmoid Function

<img src="/workspace/devlog/artificial_intelligence/logistic_regression/res/2.png" style="width:50%;"/>

> y 값을 2개만 가지는 데이터의 특성에 반면 무한한 값을 가지는 linear regression은 부적합하다. 이를 위해 새로운 모델을 생각해 보자. 무언가 2개를 명확히 구분할 수 있도록 하는 모델이면 좋을듯 하다.

<img src="/workspace/devlog/artificial_intelligence/logistic_regression/res/3.png" style="width:50%;"/>

$$ y = {1 \over {1 + e^{-z}}} $$

> 위와 같은 형태의 함수를 시그모이드라고 부른다. S자 모양을 닮아서 그렇다고 한다. 보면 가운데 부분을 제외하고 양 날개 부분은 값이 합격과 불합격으로 분명하게 나뉜다. 선형회귀 모델 보다는 2분법적으로 무언가를 나누는데에 적합한것 같다. 위의 그래프의 시그모이드 모형은 조금은 이상적이며 실제적으로 쓰이는 것은 아래와 같다.

<img src="/workspace/devlog/artificial_intelligence/logistic_regression/res/4.png" style="width:50%;"/>

> 0.5 값을 기준으로 y 값이 달라진다고 생각하면 된다. 위의 예를 활용한다면 0.5 이하는 불합격, 0.5 이상은 합격이다. 보면 y 값은 0 ~ 1의 범주를 가진다. 이는 확률과 굉장히 유사한 개념이며 이와 동일하게 생각해도 좋다. 즉 50% 이하는 불합격, 50% 이상은 합격인 것이다. 즉 기존의 선형회귀와는 달리 확률론을 모델에 적용하여 이분법적인 사고를 가능하게 만드는 것이 Logistic Regression에서 Sigmoid model이다.

## Activation Function

> Logistic Regression의 Hypothesis model을 결정할 때 Sigmoid Model이 Linear Model 대체하는 개념이 아니다. Linear Model과 같은 실제 Hypothesis model이 존재한다면 그 결과값(y)를 다시 sigmoid model의 입력으로 받아서 값의 범주를 0 ~ 1 안으로 들어오게만 바꿔준다. 기존의 선형 회귀 모델이론에 확률을 추가하는 느낌이다. 이렇게 실제 가설 모델 의 결과값을 다시 입력값으로 받아 시스템이 처리하기 쉽게 바꿔주는 함수들을 activation function이라고 부르며 sigmoid 말고도 ReLU, Tanh 등이 존재한다.

## Hypothesis

> 지금까지 배운 Sigmoid Model을 활용해 Logistic Regression의 Hypothesis model을 세워보자. 이는 아래와 같다.

$$ y = {1 \over {1 + e^{-z}}}, \,\,\,\,\,\,\, z = WX + b $$

$$ y = {1 \over {1 + e^{-(WX + b)}}} $$

> z 값이 이전에 배운 Linear Regression의 출력값으로 활용되었다. 전체적인 흐름은 아래와 같다. 그리고 이해를 위해 앞으로는 Hypothesis를 h(x)로
표현하도록 하겠다.

```
    Input values -> Linear Model -> Sigmoid Model -> Output value
```

$$ h(x) = {1 \over {1 + e^{-(WX + b)}}} $$

## Cost Function

> 이번 Cost Function은 Linear Regression과는 많이 다르다. Logistic Regression이 Linear Regression과 가장 다른 부분인것 같다.
Gradient Descent 알고리즘을 적용하기 위해서는 Cost Function이 Convex한 모양을 가져야 한다. 그렇지 않으면 Local Minimum 문제에 도달할 수 있다. 그러나 이번 Logistic Regression Hypothesis는 아래와 같이 자연로그를 포함하고 있어 Linear Regression과 같이 최소제곱법을 사용하게 된다면 이는 Non Convex 모양이 되어버린다.

_Logistic Regression Hypothesis_

$$ y = {1 \over {1 + e^{-(WX + b)}}} $$

> Logistic Regression에서 Cost Function이 Convex 모양을 갖기 위한 새로운 알고리즘을 소개한다. Cross Entropy Loss라고 부르며 Log함수를 활용한다. Cost Function에서 가장 중요한 점은 Hypothesis 모델이 데이터를 잘 표현하고 있다면 에러 값을 작게하고 그렇지 않다면 크게 하도록 만드는 것이다. 이와 동일하게 Logistic Regression에서는 출력값이 참 혹은 아니오 2가지 밖에 없음으로 만약 Hypothesis 모델의 예측이 데이터와 같다면 잘 표현한 것으로 에러를 적게 하고 반대의 경우로 예측이 틀렸다면 에러를 높이면 된다. 

## Cross Entropy Loss

$$ Cost Function = \{ 
    \begin{matrix}
         -ln(h(x)) : y = 1 \\
         -ln(1 - h(x)) : y = 0 
     \end{matrix}
$$

> Cross Entropy Loss 는 실제 데이터의 y값이 1인경우 0인경우에 따라서 이용하는 함수가 달라진다. 우선 각 y = 1인 경우를 살펴보자.

_-ln(h(x))_

<img src="/workspace/devlog/artificial_intelligence/logistic_regression/res/5.png" style="width:50%;"/>

> 실제 데이터의 결과 y = 1 일때 사용하는 함수의 그래프이다. 실제 데이터의 결과가 y = 1이라면 Hypothesis model을 통한 예측값이 1일 떄는 데이터를 잘 표현한 것임으로 에러는 적은 값을 가져야하고 0일 때에는 데이터를 잘 표현하지 못했음으로(예측을 틀렸음으로) 에러는 큰 값을 가져야 한다. 이 모델을 살펴보면 hypothesis model을 의미하는 h(x)가 입력 값으로 들어가고 있다. 위의 파란 그래프 따라서 보면 이 입력값이 1일 때는 Error는 0을 가리키며 반대로 0일 경우 예측에 틀림으로 무한대의 에러값을 가지고 있다.

_-ln(1 - h(x))_

<img src="/workspace/devlog/artificial_intelligence/logistic_regression/res/6.png" style="width:50%;"/>

> 실제 데이터의 결과 y = 0 일때 사용하는 함수의 그래프이다. 실제 데이터의 결과가 y=0 이라면 Hypothesis model을 통한 예측값이 0일 떄는 데이터를 잘 표현한 것임으로 에러는 적은 값을 가져야하고 1일 때에는 데이터를 잘 표현하지 못했음으로 에러는 큰 값을 가져야 한다. 이는 위 y = 1의 경우와 반대로 이루어진다고 보면 된다. 초록색 그래프를 잘 살펴보자. hypothesis model을 의미하는 h(x)가 입력 값으로 들어가고 있다. 이 입력 값이 0일 때에는 Error는 0을 가리키며 반대로 1일 경우 예측에 틀림으로 무한대의 에러값을 가지고 있다.

> 한가지 명심해야할 사항은 입력값으로 들어오는 h(x) 값의 범위는 Sigmoid 함수를 사용하고 있음으로 0 ~ 1이다. 그럼으로 그 외의 범위에 있는 값은 신경 쓸 필요가 없다.

> 위의 Cross Entropy Loss는 y값의 경우에 따라서 2개의 수식으로 나누어져 있는데 이는 단지 이해를 위한 것으로 이번에는 하나의 수식으로 표현해 보겠다.

$$ Cost\,Function = yln(h(x)) - (1-y)ln(1 - h(x)) $$

> y 값의 경우에 따라서 두 부분의 수식이 상반되며 활성화 되었다가 비활성화된다. 이는 위의 2개의 수식을 표현한 것과 일치함을 보인다. 이는 한개의 데이터에 대한 Error 수치임으로 모든 데이터에 대해서 적용할 수 있도록 Cost Function을 확장하자. 그리고 데이터의 개수가 영향을 주면 안됨으로 데이터의 개수만큼 나누어 주자. 즉 평균을 구한다.

$$ Cost\,Function = {1 \over n} \sum_{i=1}^n (y_iln(h(x_i)) - (1 - y_i)ln(1 - h(x_i))) $$



## Gradient Descent

> Cost Function을 Convex한 모양으로 만들었음으로 Gradient Descent 알고리즘을 동일하게 적용하여 Hypothesis의 weight 값과 bias 값을 수정하면 된다. 아래는 Cost Function의 편미분과 Gradient Descent 알고리즘이 적용된 Delta Rule 이다.

_Partial Derivative_

$$ 
    {\partial \over \partial w_1} Cost\,Function = {1 \over n} \sum_{i=1}^{n} (h(x^{(i)}) - y^{(i)})x_1^{(i)} \\
    {\partial \over \partial w_2} Cost\,Function = {1 \over n} \sum_{i=1}^{n} (h(x^{(i)}) - y^{(i)})x_2^{(i)} \\
    {\partial \over \partial w_3} Cost\,Function = {1 \over n} \sum_{i=1}^{n} (h(x^{(i)}) - y^{(i)})x_3^{(i)} \\

    \\ ... \\
    
    {\partial \over \partial b} Cost\,Function = {1 \over n} \sum_{i=1}^{n} (h(x^{(i)}) - y^{(i)})
$$

[Cross Entropy Loss 미분 상세 과정](http://solarisailab.com/archives/2237){: target="_blank"}

_Delta Rule_

$$ 
    w_1^{(n+1)} = w_1^{(n)} - \alpha { \partial \over \partial w_1} Cost Function \\
    w_2^{(n+1)} = w_2^{(n)} - \alpha { \partial \over \partial w_2} Cost Function \\
    w_3^{(n+1)} = w_3^{(n)} - \alpha { \partial \over \partial w_3} Cost Function \\
    
    \\ ... \\
    
    b^{(n+1)} = b^{(n)} - \alpha { \partial \over \partial b} Cost Function
$$

