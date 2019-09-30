---
layout: post
title:  "Coding Test - Dividing Sequence Of Numbers / Modulus"
date:   2019-08-11 11:21:54 +0900
categories: coding_test modulus
---

## Core
```


    나누어 떨어짐, 배수등을 연산하기 위해 Modulus 연산자를 사용하자.


```

## Question
> array의 각 element 중 divisor로 나누어 떨어지는 값을 오름차순으로 정렬한 배열을 반환하는 함수, solution을 작성해주세요. <br><br> divisor로 나누어 떨어지는 element가 하나도 없다면 배열에 -1을 담아 반환하세요.

```
    input : int[] arr, int divisor
    output : int[] answer
```
[문제 보기](https://programmers.co.kr/learn/courses/30/lessons/42862){: target="_blank"}

## Solution
>  입력 파라미터로 들어온 int[] arr에 대해 반복문을 돌려서 각 값이 divisor로 나누어 진다면 answer에 추가하자. <br><br> 나누어진다는 것은 나머지 연산자를 사용했을 때 나머지가 0임을 의미한다.


### Data Structure
> 간단한 문제임으로 새로운 자료구조는 사용하지 않고 입력값의 자료형 int[]을 그대로 사용한다.

```java
     
    // Data Structure : int[]
    int[] arr;

```

### Algorithm
> 나누어 떨어지는 경우 answer 배열에 추가해주면 된다.

```java

	for(0 ~ arr.length)
		if(arr[i] % divisor == 0)
			answer.add(arr[i]);

```