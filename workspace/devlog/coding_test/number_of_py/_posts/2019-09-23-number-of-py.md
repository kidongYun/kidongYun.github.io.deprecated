---
layout: post
title:  "Coding Test - Number of PY / String"
date:   2019-08-11 11:21:54 +0900
categories: coding_test string
---

## Core
```
    String의 대소문자 구분으로 인해 문제풀이가 번거로운 경우 toUpperCase(), toLowerCase() 함수로 통일하자.
```

## Question
> 대문자와 소문자가 섞여있는 문자열 s가 주어집니다. s에 'p'의 개수와 'y'의 개수를 비교해 같으면 True, 다르면 False를 return 하는 solution를 완성하세요. 'p', 'y' 모두 하나도 없는 경우는 항상 True를 리턴합니다. 단, 개수를 비교할 때 대문자와 소문자는 구별하지 않습니다. <br><br> 예를 들어 s가 pPoooyY면 true를 return하고 Pyy라면 false를 return합니다.

```
    input : String s
    output : boolean answer
```
[문제 보기](https://programmers.co.kr/learn/courses/30/lessons/12916){: target="_blank"}

## Solution
> 입력 파라미터 s를 toUpperCase(), toLowerCase()를 활용해 대문자 혹은 소문자로 통일하고 , s의 크기만큼 반복문을 돌려 p와 y의 개수를 센다. 결과적으로 두 수가 동일하면 true, 아니면 false를 반환한다.


### Data Structure
> 입력으로 들어온 String 자료형을 그대로 사용한다. 즉 특별한 자료구조가 필요하지 않으며 다만 대문자 혹은 소문자 일치시키기 위한 작업을 선처리한다. 그리고 p, y의 개수를 체크하기 위한 int형 변수 2개를 추가한다.

```java

String s = s.toLowerCase(); // 입력으로 받은 값이다
int p, y;
    
```


### Algorithms
> 0부터 s의 크기만큼 반복문을 돌리고 그 안에서 p, y의 개수를 카운트한다.

```java

for(0 ~ s.length) {
	if(s.charAt(i) == 'y') y++;
	else if(s.charAt(i) == 'p')p++;
}

```