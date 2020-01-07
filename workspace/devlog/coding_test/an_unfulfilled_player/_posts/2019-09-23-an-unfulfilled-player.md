---
layout: post
title:  "Coding Test - An fulfilled player / HashMap"
date:   2019-08-11 11:21:54 +0900
categories: coding_test hashmap
---

## Core
```


    key가 int형이 아닐 경우 배열보다 Hashmap을 사용하면 시간복잡도를 크게 줄일 수 있다.


```

## Question
> 수많은 마라톤 선수들이 마라톤에 참여하였습니다. 단 한 명의 선수를 제외하고는 모든 선수가 마라톤을 완주하였습니다. <br><br> 마라톤에 참여한 선수들의 이름이 담긴 배열 participant와 완주한 선수들의 이름이 담긴 배열 completion이 주어질 때, 완주하지 못한 선수의 이름을 return 하도록 solution 함수를 작성해주세요.

```
    input : String[] participant, String[] completion
    output : String answer
```
[문제 보기](https://programmers.co.kr/learn/courses/30/lessons/42576){: target="_blank"}

## Solution
> 완주하지 못한 선수의 이름을 알기 위해서 participant 선수 목록과 completion 선수 목록을 비교해 없는 사람을 찾아낸다. <br><br> 완주하지 못한 사람은 단 한명으로 제한되어 있음으로 participant - completion 하게되면 그 한명을 구할 수 있다. <br><br> 또 사람이 중복 될 수 있음을 고려해야 한다.

### Data Structure
> 기본적으로 주어진 입력값 String[] 자료구조를 바로 이용하게 된다면 배열의 특성상 int형의 index를 기준으로 데이터들을 구분하기 때문에 participant와 completion의 선수 목록을 비교할 때 두 String이 값이 같을 때까지 계속 반복하며 비교해야 함으로 2중 for문을 사용해야 한다. <br><br> __이렇게 데이터를 구분하는 기준이 int형이 아닐 경우 배열보단 Hashmap을 사용하는 것이 훨씬 효율적이다. 선수 이름 자체가 key값 임으로 선수 이름을 찾기 위한 시간 복잡도가 줄어든다.__ <br><br> 선수 이름이 중복되는 경우를 고려하기 위해 각 key에 대해 value값을 Integer로 두어 같은 이름을 가진 선수의 수를 체크하도록 한다.

```java
    /* 
        Data Structure : HashMap
        Key : 선수 이름
        Value : 그 이름을 가진 선수의 수
    */
    HashMap<String, Integer> map;
```

### Algorithm
> participant 선수 목록을 map에 추가하고 completion 선수 목록을 제거한다. 최종적으로 남은 한 사람이 완주하지 못한 선수이다.

```java

    for(i=0 ~ participant.length)
        if(map.containKey()) map.put(i, i+1)
        else map.put(i, 1)

    for(i=0 ~ completion.length)
        if(map.get(i) == 1) map.remove(i)
        else map.put(i, i-1)

```