---
layout: post
title:  "Coding Test - Sum between Two Integers / Arithmetic Sequence"
date:   2019-08-11 11:21:54 +0900
categories: coding_test mathematical_formula
---

## Core

$$ sum = {(first + last) size \over 2} $$

## Question
> 두 정수 a, b가 주어졌을 때 a와 b 사이에 속한 모든 정수의 합을 리턴하는 함수, solution을 완성하세요. <br><br> 예를 들어 a = 3, b = 5인 경우, 3 + 4 + 5 = 12이므로 12를 리턴합니다.

```
    input : int a, int b
    output : long answer
```
[문제 보기](https://programmers.co.kr/learn/courses/30/lessons/12912){: target="_blank"}

## Solution
>  반복문을 활용하여 a부터 b까지의 합을 구할수도 있지만 등차수열의 합 공식을 활용하면 훨씬 효율적인 방법으로 계산할 수 있다. <br><br> _'두 정수 사이의 합 = (첫항 + 끝항) * 항의 개수 / 2'_ 을 활용하면 바로 정답을 구할 수 있다.


### Data Structure
> 자료구조가 필요하지 않은 문제다.

### Algorithm
> 등차수열의 합을 활용하자.

```java

    return (a+b) * (a-b+1) / 2; 

```