---
layout: post
title:  "Coding Test - Determining Square Root / String"
date:   2019-08-11 11:21:54 +0900
categories: coding_test string
---

## Core
```

	String 문자열을 특정 구분자를 활용해 String[]로 나눌때 split()함수를 활용한다.
	특히 주의할 점은 구분자가 "."이라면 "\\."로 표기해야한다.

```

## Question
> 임의의 양의 정수 n에 대해, n이 어떤 양의 정수 x의 제곱인지 아닌지 판단하려 합니다. <br><br> n이 양의 정수 x의 제곱이라면 x+1의 제곱을 리턴하고, n이 양의 정수 x의 제곱이 아니라면 -1을 리턴하는 함수를 완성하세요.

```
    input : long n
    output : String answer
```
[문제 보기](https://programmers.co.kr/learn/courses/30/lessons/12934){: target="_blank"}

## Solution
>  입력된 값 n에 제곱근을 취했을 때 정수라면 n값에 1을 더하고 제곱을 하여 반환한다. 이 문제는 split() 함수를 사용할 때 구분자가 "."일 경우 다르게 표기해야 하기 때문에 주의가 필요하다.

### Data Structure
> 특별한 자료구조가 필요하지 않다.

### Algorithm
```java

if((Math.sqrt(n)+"").split("\\.")[1].equals("0"))
	answer = (long)Math.pow((Integer.parseInt((Math.sqrt(n)+"").split("\\.")[0])+1), 2);

```