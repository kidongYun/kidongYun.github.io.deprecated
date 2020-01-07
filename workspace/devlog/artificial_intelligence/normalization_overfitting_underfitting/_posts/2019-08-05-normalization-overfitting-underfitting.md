---
layout: post
title:  "Machine Learning - Normalization, Overfitting, Underfitting"
date:   2019-08-05 11:21:54 +0900
categories: artificial_intelligence
---

## Normalization
> 입력 데이터를 들어오는 그대로 사용하면 문제가 생길수도 있다. 예를 들어 2개의 입력을 받아서 1개의 결과를 도출하는 Machine Learning Model이라고 생각해보자. 근데 이 2개의 입력 값의 범주가 1개는 1 ~ 10 범위를 가지고 있고 다른 하나는 1000 ~ 10000이라면 단지 이 데이터의 수치에 의해 그 입력값의 가중치가 결정되어 버린다. 이를 위해 입력 데이터를 적절히 선처리작업을 진행해야 한다.

<img src="/workspace/devlog/artificial_intelligence/normalization_overfitting_underfitting/res/1.png" style="width:80%;"/>

> Unnormalized의 경우 모델의 Coutour Plot이 찌그러져서 나타나는 걸 볼 수 있다. 이는 입력값에 존재하는 차이 때문에 그럴수 있다. 이를 개선하기 위해 Normalization을 진행한다. 이는 각 입력값들의 차이를 없애주는 작업으로써 아래의 수식을 적용하면 간단하게 마무리 된다.

$$ x_{normalized} = { {x_{origin} - average} \over range } $$

> 원래의 x값에 해당 데이터들의 평균값으로 뺴주고난 다음 그 데이터의 범위(range) 만큼으로 나누어 준다. range 값은 데이터 중 최대값 - 최소값이 될수도 있으며 Deviation을 구할 수도 있다. 이를 통해 입력 값들의 차이를 줄이고 모델은 보다 나은 학습을 진행할 수 있다.

## Overfitting, Underfitting

<img src="/workspace/devlog/artificial_intelligence/normalization_overfitting_underfitting/res/2.png" style="width:100%;"/>

> 이전에 서술한 Linear Regression의 경우는 실제로 문제를 다룰 때에는 High bias한 경우가 많다. 이 말은 너무 고정적이라서 데이터의 변화를 감당하지 못한다는 것이다. 위의 그래프에서 가장 왼쪽 Underfitting의 경우를 보면 선형모델이 데이터를 표현하고 있지만 뭔가 조금은 아쉽다. 이렇게 모델이 High bias하여 데이터들의 특성을 모두 표현해내지 못하는 경우 Underfitting이라고 한다.

> 반대로 가장 오른쪽의 Overfitting의 경우를 보자. 이 모델은 너무 High variance하다. Data를 표현하기 위해서 너무 많은 변화를 가지고 있는 모델임을 의미한다. 데이터를 완벽하게 표현함으로 당연히 가장 좋은 모델일 것이라고 생각할 수 있지만 그렇지 않다. 우리가 모델을 만드는 이유는 데이터를 잘 표현해내서 미지의 새로운 데이터가 발생했을 때 모델을 근거로 하여 예측하고 대처하기 위함이다. 그러나 이렇게 High variance하다면 현재 가지고 있는 학습 데이터셋에 과적합이 되어버려서 새로운 데이터의 특성을 받아들이기가 어려워진다. 이러한 경우를 Overfitting이라고 한다.

> Overfitting, Underfitting 문제는 Learning System에서 중요시 다뤄지는 사안이다. 이를 Optimal한 모델로 구현하기 위해서 다양한 노력이 있는데 그 중 대표적인 것은 학습 데이터 셋을 train set, validation set, test set 3가지로 구분하는 것이다. 구분하게 된다면 모델에 대한 평가가 가능해진다.


