---
layout: post
title:  "Coding Test - String in Descending Order / Sort"
date:   2019-08-11 11:21:54 +0900
categories: coding_test sort
---

## Core
```


    기본적으로 설정되어 있는 char 타입의 정렬 기준은 ASC값을 따른다.


```

## Question
> 문자열 s에 나타나는 문자를 큰것부터 작은 순으로 정렬해 새로운 문자열을 리턴하는 함수, solution을 완성해주세요. <br><br> s는 영문 대소문자로만 구성되어 있으며, 대문자는 소문자보다 작은 것으로 간주합니다.

```
    input : String s
    output : String
```
[문제 보기](https://programmers.co.kr/learn/courses/30/lessons/42576){: target="_blank"}

## Solution
> 입력값으로 들어온 s를 Arrays.sort()함수를 적용하기 위해 char[] 배열로 변환하자. <br><br> 내림차순으로 정렬하기 위해서 새로운 기준이 필요한 것이 아니기 때문에 Collections.reverseOrder()를 활용하여 내림차순 정렬한다.

### Data Structure
> 각 영문자들을 정렬하기 위해서 char[] 자료형을 사용해야한다. 그러나 추가적으로 사용한 Collections.reverseOrder() 함수는 primitive 자료형에는 적용할 수가 없다. 따라서 Character[] 자료형를 사용한다.

```java 

// Data Structure : Character[]
Character[] chs;

```

### Algorithm
> 입력값 s를 Character[] 자료형으로 변환한다. Arrays.sort()함수와 Collections.reverseOrder()를 활용하여 내림차순으로 정렬한 후 다시 String형 변환하여 답을 도출한다.

```java
Character[] ch = s.chars().mapToObj(c -> (char)c).toArray(Character[]::new);    // String -> Character[]  
Arrays.sort(ch, Collections.reverseOrder()); // Descending Sorting
return Arrays.stream(ch).map(String::valueOf).collect(Collectors.joining()); // Character[] -> String
```