---
layout: post
title:  "Coding Test - Sort using Comparator / Sort"
date:   2019-08-11 11:21:54 +0900
categories: coding_test sort
---

## Core
```
    Comparator 클래스를 활용하여 Custom Sorting을 구현해보자.
```

## Question
> 문자열로 구성된 리스트 strings와, 정수 n이 주어졌을 때, 각 문자열의 인덱스 n번째 글자를 기준으로 오름차순 정렬하려 합니다. <br><br> 예를 들어 strings가 [sun, bed, car]이고 n이 1이면 각 단어의 인덱스 1의 문자 u, e, a로 strings를 정렬합니다.

```
    input : String[] strings, int n
    output : String[] answer
```
[문제 보기](https://programmers.co.kr/learn/courses/30/lessons/12915){: target="_blank"}

## Solution
>  Array.sort() 함수는 자료의 타입이 String일 때 기본적으로 사전순으로 나열한다. 그러나 이 문제처럼 특별한 기준으로 정렬하고 싶을 때에는 Comparator 클래스를 상속하거나 Comparable 인터페이스를 구현하여 문제를 해결한다. <br><br> 비교 대상이 primitive 자료형일 경우 Comparator 클래스를 상속하는게 보다 간단하며 새로운 객체를 구현해야 하는 경우는 Comparable 인터페이스를 구현한다. <br><br> Array.sort() 함수에 두번째 파라미터로 Comparator 객체를 전달하면 이 기준으로 정렬하도록 도와준다. 


### Data Structure
> 자료구조가 필요하지 않은 문제다.

### Algorithms
> 알고리즘이라기 보다는 Comparator 클래스의 사용법을 이해하자. 특히 이 문제에서 n으로 정렬시 비기는 경우가 발생하면 사전순으로 정렬하도록 요구한다. 이럴때는 Comparator 클래스에서 return 0가 나와야 하는 부분에 compareTo() 함수를 사용해 기존의 정렬방법을 사용할수 있도록 구현한다. <br><br> 추가적으로 return 1과 return -1의 부분만 변경해주면 오름차순에서 내림차순으로 혹은 그 반대로 정렬할 수 있다.

```java

Arrays.sort(strings, new Comparator<String>() {
    @Override
    public int compare(String o1, String o2) {
        if(o1.charAt(n) > o2.charAt(n))
            return 1;
        else if(o1.charAt(n) < o2.charAt(n))
            return -1;
        else
            return o1.compareTo(o2);
    }
});

```